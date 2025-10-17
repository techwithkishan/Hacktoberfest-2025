using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

// Add this require component attribute to ensure the Player always has an AudioSource.
// It will automatically add one if it's missing.
[RequireComponent(typeof(AudioSource))]
public class PlayerController : MonoBehaviour
{
    // --- Public Variables (Configurable in the Unity Inspector) ---

    [Header("Movement Settings")]
    public float moveSpeed = 5f;
    public float jumpForce = 5f;

    [Header("UI References")]
    public TextMeshProUGUI scoreText;
    public TextMeshProUGUI winTextObject;
    public GameObject restartButtonObject;

    [Header("Audio Clips")]
    public AudioClip jumpSound;
    public AudioClip coinSound;
    public AudioClip winSound;

    // --- Private Variables (Internal logic) ---

    private Rigidbody2D rb;
    private bool isGrounded;
    private int score = 0;
    private AudioSource audioSource; // Reference to our Audio Source component

    // Start is called before the first frame update when the script is enabled
    void Start()
    {
        // Get references to the components attached to this GameObject
        rb = GetComponent<Rigidbody2D>();
        audioSource = GetComponent<AudioSource>();

        // Ensure game time is running normally at the start of the level
        Time.timeScale = 1f;

        // Initialize the score text display
        UpdateScoreText();
    }

    // Update is called once every frame
    void Update()
    {
        // --- Sideways Movement ---
        float moveInput = Input.GetAxis("Horizontal");
        rb.linearVelocity = new Vector2(moveInput * moveSpeed, rb.linearVelocity.y);

        // --- Jumping ---
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
            
            // Play the jump sound if it has been assigned
            if (jumpSound != null)
            {
                audioSource.PlayOneShot(jumpSound);
            }
        }
    }

    // This function is called when this collider begins touching another solid collider
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }
    }

    // This function is called when this collider stops touching another solid collider
    private void OnCollisionExit2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = false;
        }
    }

    // This function is called when this collider enters a trigger collider (Is Trigger = true)
    private void OnTriggerEnter2D(Collider2D other)
    {
        // Use an if/else-if structure for efficiency and safety
        if (other.gameObject.CompareTag("Coin"))
        {
            Destroy(other.gameObject);
            score++;
            UpdateScoreText();
            
            // Play the coin sound
            if (coinSound != null)
            {
                audioSource.PlayOneShot(coinSound);
            }
        }
        else if (other.gameObject.CompareTag("DeathZone"))
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
        else if (other.gameObject.CompareTag("Goal"))
{
    // THIS IS THE NEW LINE YOU NEED TO ADD:
    winTextObject.text = "You Win!\nScore: " + score;

    // These lines stay the same
    winTextObject.gameObject.SetActive(true);
    restartButtonObject.SetActive(true);
    Time.timeScale = 0f;

    // ... (the sound effect code stays the same) ...
}
    }

    // A helper function to update the score text UI element
    void UpdateScoreText()
    {
        scoreText.text = "Score: " + score;
    }

    // This function is called by the OnClick event of our Restart Button
    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}