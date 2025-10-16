using UnityEngine;

public class CameraController : MonoBehaviour
{
    // A public variable to hold a reference to our Player object.
    // We will drag the Player into this slot in the Unity Editor.
    public Transform player;

    // We use LateUpdate() for camera movement. This function is called
    // after all other Update() functions have finished. This ensures
    // the player has completed its movement for the frame BEFORE the
    // camera tries to catch up, preventing a jerky camera effect.
    void LateUpdate()
    {
        // Check if the player reference has been set
        if (player != null)
        {
            // Get the camera's current position
            Vector3 newPosition = transform.position;

            // Update the camera's X and Y position to match the player's
            newPosition.x = player.position.x;
            newPosition.y = player.position.y;

            // Apply the new position to the camera.
            // We keep the original Z position (-10 by default for 2D)
            // so the camera stays at the correct distance to see the scene.
            transform.position = newPosition;
        }
    }
}