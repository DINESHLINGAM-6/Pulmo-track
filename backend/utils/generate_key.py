from secrets import token_hex
import base64

def generate_jwt_key():
    # Generate a 32-byte (256-bit) random key
    key = token_hex(32)
    print("\nGenerated JWT Secret Key:")
    print(key)
    
    # Also show base64 encoded version
    base64_key = base64.b64encode(key.encode()).decode()
    print("\nBase64 Encoded Version:")
    print(base64_key)

if __name__ == "__main__":
    generate_jwt_key() 