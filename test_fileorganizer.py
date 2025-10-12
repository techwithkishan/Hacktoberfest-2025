import os
import shutil
import pytest
from pathlib import Path

# Import the functions we want to test from the original script
from fileorganizer import classify_file, get_unique_name, organize_folder

# This is a pytest "fixture". It creates a temporary directory for our tests to run in.
# This is great because it keeps our main project folder clean.
@pytest.fixture
def temp_dir(tmp_path):
    # Create a temporary directory structure for testing
    source_dir = tmp_path / "source"
    source_dir.mkdir()
    # Create some dummy files
    (source_dir / "image.jpg").touch()
    (source_dir / "document.pdf").touch()
    (source_dir / "archive.zip").touch()
    (source_dir / "script.py").touch()
    (source_dir / "unknown.xyz").touch()
    return source_dir

def test_classify_file(temp_dir):
    """Tests if files are classified into the correct categories."""
    assert classify_file(temp_dir / "image.jpg") == "images"
    assert classify_file(temp_dir / "document.pdf") == "documents"
    assert classify_file(temp_dir / "archive.zip") == "archives"
    assert classify_file(temp_dir / "script.py") == "code"
    assert classify_file(temp_dir / "unknown.xyz") == "others"

def test_get_unique_name(temp_dir):
    """Tests that a unique name is generated if a file already exists."""
    # Test case 1: File does not exist, name should not change.
    original_name = "new_file.txt"
    assert get_unique_name(temp_dir, original_name) == original_name

    # Test case 2: File exists, name should change.
    existing_file = "image.jpg"
    new_name = get_unique_name(temp_dir, existing_file)
    assert new_name != existing_file
    assert "image" in new_name and ".jpg" in new_name

def test_organize_folder(temp_dir):
    """Tests the main folder organization logic."""
    # Run the main function on our temporary directory
    organize_folder(str(temp_dir))

    # Check 1: Were the new category folders created?
    assert (temp_dir / "images").is_dir()
    assert (temp_dir / "documents").is_dir()
    assert (temp_dir / "archives").is_dir()
    assert (temp_dir / "code").is_dir()
    assert (temp_dir / "others").is_dir()

    # Check 2: Were the files moved correctly?
    assert (temp_dir / "images" / "image.jpg").is_file()
    assert (temp_dir / "documents" / "document.pdf").is_file()
    assert (temp_dir / "archives" / "archive.zip").is_file()
    assert (temp_dir / "code" / "script.py").is_file()
    assert (temp_dir / "others" / "unknown.xyz").is_file()

    # Check 3: Is the log file created?
    assert (temp_dir / "organizer_log.txt").is_file()
