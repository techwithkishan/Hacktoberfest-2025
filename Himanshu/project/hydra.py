import hashlib
import itertools
import string

def crack_password(hash_value, length):
    # Generate all possible combinations of characters
    characters = string.ascii_letters + string.digits + string.punctuation
    
    # Iterate over all possible combinations of the given length
    for combination in itertools.product(characters, repeat=length):
        # Convert the combination to a string
        password = ''.join(combination)
        
        # Hash the password using SHA-256
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Check if the hashed password matches the given hash value
        if hashed_password == hash_value:
            return password
    
    # If no match is found, return None
    return None

# Example usage
hash_value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
length = 4
password = crack_password(hash_value, length)

if password:
    print(f'Password cracked: {password}')
else:
    print('Password not found')