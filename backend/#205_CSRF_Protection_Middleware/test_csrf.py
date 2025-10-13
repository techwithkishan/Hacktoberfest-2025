import unittest
from csrf_token import CSRFTokenGenerator

class TestCSRFToken(unittest.TestCase):
    def setUp(self):
        self.secret_key = "test-secret-key"
        self.generator = CSRFTokenGenerator(self.secret_key)
        self.session_id = "test-session-123"
    
    def test_token_generation(self):
        token = self.generator.generate_token(self.session_id)
        self.assertIsInstance(token, str)
        self.assertTrue(len(token) > 0)
    
    def test_token_validation(self):
        token = self.generator.generate_token(self.session_id)
        self.assertTrue(self.generator.validate_token(token, self.session_id))
    
    def test_invalid_session(self):
        token = self.generator.generate_token(self.session_id)
        self.assertFalse(self.generator.validate_token(token, "different-session"))
    
    def test_tampered_token(self):
        token = self.generator.generate_token(self.session_id)
        tampered_token = token[:-5] + "abcde"
        self.assertFalse(self.generator.validate_token(tampered_token, self.session_id))

if __name__ == '__main__':
    unittest.main()