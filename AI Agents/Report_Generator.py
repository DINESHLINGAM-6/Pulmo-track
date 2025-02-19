import streamlit as st
from textwrap import dedent
from datetime import datetime
import requests
import PyPDF2

# Import the agent libraries (adjust these if your installation differs)
from agno.agent import Agent
from agno.models.google import Gemini

# Import Supabase client
from supabase import create_client, Client




# ------------------- Dashboard Title -------------------
st.title("Pulmonology Dashboard for Lung Cancer Patients")

# ------------------- Sidebar Configuration -------------------
st.sidebar.header("Configuration & User Details")
gemini_api_key = st.sidebar.text_input("Gemini API Key", type="password")
supabase_url = st.sidebar.text_input("Supabase URL")
supabase_key = st.sidebar.text_input("Supabase API Key", type="password")
pollution_api_key = st.sidebar.text_input("Pollution API Key (OpenWeatherMap)", type="password")
user_email = st.sidebar.text_input("Your Email (for medical records)")

if not gemini_api_key:
    st.sidebar.warning("Please provide your Gemini API key.")
    st.stop()

# ------------------- Initialize Supabase Client -------------------
if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    supabase = None

# ------------------- Auto-Detect Location & Fetch Pollution Data -------------------
st.sidebar.subheader("Location & Air Quality")
try:
    ip_response = requests.get("http://ip-api.com/json/").json()
    lat = ip_response.get("lat")
    lon = ip_response.get("lon")
    city = ip_response.get("city")
    region = ip_response.get("regionName")
    country = ip_response.get("country")
    st.sidebar.write(f"**Detected:** {city}, {region}, {country}")
except Exception as e:
    st.sidebar.error("Location detection failed.")
    lat = None
    lon = None

if pollution_api_key and lat and lon:
    pollution_api_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={pollution_api_key}"
    try:
        response = requests.get(pollution_api_url)
        if response.status_code == 200:
            pollution_data = response.json()
            # OpenWeatherMap returns an AQI on a scale of 1 (Good) to 5 (Very Poor)
            aqi = pollution_data["list"][0]["main"]["aqi"]
            aqi_dict = {1: "Good", 2: "Fair", 3: "Moderate", 4: "Poor", 5: "Very Poor"}
            quality = aqi_dict.get(aqi, "Unknown")
            st.sidebar.markdown(f"**Air Quality:** {quality}")
            if aqi >= 4:
                st.sidebar.error("High pollution levels detected! Please take precautions.")
        else:
            st.sidebar.error("Failed to fetch pollution data.")
    except Exception as e:
        st.sidebar.error("Error fetching pollution data: " + str(e))
else:
    st.sidebar.info("Pollution data not available.")

# ------------------- Initialize the Pulmonology Agent -------------------
pulmonology_agent = Agent(
    model=Gemini(
        id="gemini-2.0-flash-thinking-exp-1219",
        api_key=gemini_api_key
    ),
    description=dedent("""
        You are an experienced pulmonologist with decades of clinical practice in respiratory medicine.
        You diagnose lung diseases, provide diet recommendations for lung cancer patients,
        and consider environmental factors such as air pollution.
    """),
    instructions=dedent("""
        When communicating, remember the user's past medical records if available.
        Provide clear and structured responses tailored for lung cancer patient care.
    """),
    expected_output=dedent("""
        # Pulmonology Analysis Summary
        
        ## Patient Information
        {Extracted patient details, if available}
        
        ## Diagnosis Summary
        {Summary of diagnosis and clinical insights}
        
        ## Key Findings
        - {Key observation 1}
        - {Key observation 2}
        - {Key observation 3}
        
        ## Treatment Recommendations
        {Recommended treatment options or next steps, if applicable}
        
        ## Follow-Up Recommendations
        {Suggested follow-up actions or further analysis}
        
        ---
        Analysis conducted on {current_date} at {current_time}
    """),
    markdown=True,
    show_tool_calls=True,
    add_datetime_to_instructions=True,
)

# ------------------- Tabs for Dashboard Functionality -------------------
tabs = st.tabs(["Document Analysis", "Chat", "Diet Recommendations", "My Medical Records"])

# ------------------- Tab 1: Document Analysis -------------------
with tabs[0]:
    st.header("Document Analysis")
    st.write("Upload a clinical document (PDF, TXT, DOCX) for analysis.")
    
    uploaded_file = st.file_uploader("Upload Document", type=["txt", "pdf", "docx"])
    file_content = ""
    if uploaded_file:
        file_type = uploaded_file.type
        if file_type == "application/pdf":
            try:
                pdf_reader = PyPDF2.PdfReader(uploaded_file)
                for page in pdf_reader.pages:
                    text = page.extract_text()
                    if text:
                        file_content += text
            except Exception as e:
                st.error("Error reading PDF: " + str(e))
        elif file_type in ["text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
            try:
                file_content = uploaded_file.read().decode("utf-8", errors="ignore")
            except Exception as e:
                st.error("Error reading file: " + str(e))
        else:
            st.warning("Unsupported file type.")
    
    if file_content:
        st.subheader("Document Preview")
        st.text_area("Preview", file_content, height=200)
        if st.button("Analyze Document"):
            with st.spinner("Analyzing document..."):
                response_text = pulmonology_agent.print_response(file_content, stream=False)
            if response_text:
                st.subheader("Analysis Summary")
                st.markdown(response_text)
            else:
                st.error("No response received.")

# ------------------- Tab 2: Chat -------------------
with tabs[1]:
    st.header("Chat with the Pulmonology Doctor Agent")
    
    # Attempt to load past medical records from Supabase for context
    past_records = ""
    if supabase and user_email:
        try:
            data = supabase.table("medical_records").select("*").eq("user_email", user_email).execute()
            records = data.data
            if records:
                past_records = "\n".join([f"{rec['timestamp']}: {rec['record']}" for rec in records])
                st.info("Loaded your past medical records.")
            else:
                st.info("No past records found.")
        except Exception as e:
            st.error("Error fetching past records: " + str(e))
    
    # Initialize chat history
    if "chat_history" not in st.session_state:
        st.session_state["chat_history"] = []
    
    # Display chat history using chat message UI (Streamlit 1.23+)
    for chat in st.session_state["chat_history"]:
        if chat["role"] == "user":
            st.chat_message("user").write(chat["content"])
        else:
            st.chat_message("assistant").write(chat["content"])
    
    user_message = st.text_input("Enter your message", key="chat_input")
    if st.button("Send Chat", key="send_chat_button"):
        if user_message:
            # Append past records context if available
            full_message = user_message
            if past_records:
                full_message += "\n\nPast Medical Records:\n" + past_records
            
            st.session_state["chat_history"].append({"role": "user", "content": user_message})
            with st.spinner("Agent is typing..."):
                chat_response = pulmonology_agent.print_response(full_message, stream=False)
            if chat_response:
                st.session_state["chat_history"].append({"role": "assistant", "content": chat_response})
                st.chat_message("assistant").write(chat_response)
            else:
                st.session_state["chat_history"].append({"role": "assistant", "content": "No response received."})
                st.chat_message("assistant").write("No response received.")
            
            # Optionally, store this chat as a new medical record
            if supabase and user_email:
                try:
                    new_record = {
                        "user_email": user_email,
                        "record": user_message,
                        "timestamp": datetime.now().isoformat()
                    }
                    supabase.table("medical_records").insert(new_record).execute()
                    st.success("Your message has been saved to your medical records.")
                except Exception as e:
                    st.error("Error storing your record: " + str(e))

# ------------------- Tab 3: Diet Recommendations -------------------
with tabs[2]:
    st.header("Diet Recommendations")
    st.write("Enter your details or questions regarding diet for lung cancer management.")
    diet_query = st.text_area("Diet Query", height=150)
    if st.button("Get Recommendations", key="diet_recommendation_button"):
        if diet_query:
            with st.spinner("Fetching diet recommendations..."):
                diet_prompt = f"Based on the following details, provide diet recommendations for lung cancer patients:\n\n{diet_query}"
                diet_response = pulmonology_agent.print_response(diet_prompt, stream=False)
            if diet_response:
                st.markdown(diet_response)
            else:
                st.error("No response received for diet recommendations.")

# ------------------- Tab 4: My Medical Records -------------------
with tabs[3]:
    st.header("My Medical Records")
    st.write("View and add to your medical records.")
    
    if user_email:
        if supabase:
            try:
                data = supabase.table("medical_records") \
                                 .select("*") \
                                 .eq("user_email", user_email) \
                                 .order("timestamp", desc=True) \
                                 .execute()
                records = data.data
                if records:
                    for rec in records:
                        st.markdown(f"**{rec['timestamp']}**: {rec['record']}")
                else:
                    st.info("No records found.")
            except Exception as e:
                st.error("Error fetching records: " + str(e))
        
        new_record = st.text_area("Add New Record", height=100)
        if st.button("Save Record", key="save_record_button"):
            if new_record and supabase:
                try:
                    record_data = {
                        "user_email": user_email,
                        "record": new_record,
                        "timestamp": datetime.now().isoformat()
                    }
                    supabase.table("medical_records").insert(record_data).execute()
                    st.success("Record saved successfully.")
                except Exception as e:
                    st.error("Error saving record: " + str(e))
            else:
                st.warning("Please enter a record and ensure Supabase is configured.")
    else:
        st.warning("Please enter your email in the sidebar to access your medical records.")
