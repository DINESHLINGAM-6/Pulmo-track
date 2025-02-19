import streamlit as st
from textwrap import dedent
from agno.agent import Agent
from agno.models.google import Gemini
import PyPDF2

# Ask the user to provide their Gemini API Key
api_key = st.text_input("Enter your Gemini API Key", type="password")

if not api_key:
    st.warning("Please enter your Gemini API Key to continue.")
    st.stop()

# Initialize the Pulmonology Doctor Agent with structured output
pulmonology_agent = Agent(
    model=Gemini(
        id="gemini-2.0-flash-thinking-exp-1219",
        api_key=api_key  # Using the user-provided API key
    ),
    description=dedent("""
        You are an experienced pulmonologist with decades of clinical practice in respiratory medicine.
        Your expertise includes:
        - Diagnosing and treating lung diseases
        - Analyzing complex clinical documents and medical research
        - Providing clear, structured, and concise summaries
        - Ensuring accuracy and clarity in medical analysis
        - Offering insights on patient management and treatment options
    """),
    instructions=dedent("""
        When provided with an uploaded clinical document, analyze its content and produce a structured summary with the following format:
        
        1. **Patient Information**
           - Extract relevant patient details (e.g., age, sex, medical history) if available.
        
        2. **Diagnosis Summary**
           - Summarize key diagnostic points and clinical impressions.
        
        3. **Key Findings**
           - List the most important observations and findings in bullet points.
        
        4. **Treatment Recommendations**
           - Outline suggested treatment options or management strategies.
        
        5. **Follow-Up Recommendations**
           - Provide any necessary follow-up actions or further analyses.
        
        Ensure that the summary is clear, accurate, and reflects expert pulmonology insights.
    """),
    expected_output=dedent("""
        # Document Analysis Summary 🩺

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
        Analysis conducted by AI Pulmonologist Agent
        Published: {current_date} at {current_time}
    """),
    markdown=True,
    show_tool_calls=True,
    add_datetime_to_instructions=True,
)

# Create two tabs: one for Document Analysis and one for Chat
tab1, tab2 = st.tabs(["Document Analysis", "Chat"])

with tab1:
    st.header("Pulmonology Document Analyzer")
    st.write("Upload a clinical document (e.g., a patient report or research paper) for analysis.")
    
    uploaded_file = st.file_uploader("Upload a document", type=["txt", "pdf", "docx"])
    
    file_content = ""
    if uploaded_file is not None:
        file_type = uploaded_file.type
        # For PDF files, extract text using PyPDF2
        if file_type == "application/pdf":
            try:
                pdf_reader = PyPDF2.PdfReader(uploaded_file)
                for page in pdf_reader.pages:
                    text = page.extract_text()
                    if text:
                        file_content += text
            except Exception as e:
                st.error("Error reading PDF: " + str(e))
        # For text-based or Word documents (assuming UTF-8 encoding)
        elif file_type in ["text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
            try:
                file_content = uploaded_file.read().decode("utf-8", errors="ignore")
            except Exception as e:
                st.error("Error reading file: " + str(e))
        else:
            st.warning("Unsupported file type. Please upload a txt, pdf, or docx file.")
    
    if file_content:
        st.subheader("Document Content Preview")
        st.text_area("Preview of Uploaded Document", file_content, height=200)
        
        if st.button("Analyze Document"):
            with st.spinner("Analyzing document..."):
                # Use stream=False to get the complete response as a string
                response_text = pulmonology_agent.print_response(file_content, stream=False)
            if response_text:
                st.subheader("Analysis Summary")
                st.markdown(response_text)
            else:
                st.error("No response received from the agent.")
    else:
        st.info("Please upload a document to analyze.")

with tab2:
    st.header("Chat with the Pulmonology Doctor Agent")
    
    # Initialize chat history in session state if not already set
    if "chat_history" not in st.session_state:
        st.session_state["chat_history"] = []
    
    # Display chat history
    for chat in st.session_state["chat_history"]:
        if chat["role"] == "user":
            st.markdown(f"**User:** {chat['content']}")
        else:
            st.markdown(f"**Agent:** {chat['content']}")
    
    # Input area for a new chat message
    user_message = st.text_input("Enter your message", key="chat_input")
    if st.button("Send", key="send_button"):
        if user_message:
            st.session_state["chat_history"].append({"role": "user", "content": user_message})
            with st.spinner("Agent is typing..."):
                # Use stream=False to get a complete response
                chat_response = pulmonology_agent.print_response(user_message, stream=False)
            if chat_response:
                st.session_state["chat_history"].append({"role": "agent", "content": chat_response})
            else:
                st.session_state["chat_history"].append({"role": "agent", "content": "No response received."})
