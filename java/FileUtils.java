
import java.io.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.ArrayList;


public class FileUtils {
    // Reads all lines from a file.
    public static List<String> readFile(String path) throws IOException {
        return Files.readAllLines(Paths.get(path), StandardCharsets.UTF_8);
    }

    // Writes lines to a file (overwrites if exists).
    public static void writeFile(String path, List<String> lines) throws IOException {
        Files.write(Paths.get(path), lines, StandardCharsets.UTF_8);
    }

    // Appends lines to a file.
    public static void copyFile(String source, String dest) throws IOException {
        Files.copy(Paths.get(source), Paths.get(dest), StandardCopyOption.REPLACE_EXISTING);
    }

    // Deletes a file.
    public static boolean deleteFile(String path) {
        try {
            return Files.deleteIfExists(Paths.get(path));
        } catch (IOException e) {
            return false;
        }
    }

    // Appends lines to a file.
    public static void appendToFile(String path, List<String> lines) throws IOException {
        Files.write(Paths.get(path), lines, StandardCharsets.UTF_8, StandardOpenOption.APPEND, StandardOpenOption.CREATE);
    }

    // Checks if a file exists.
    public static boolean fileExists(String path) {
        return Files.exists(Paths.get(path));
    }

    // Gets the size of a file in bytes.
    public static long getFileSize(String path) throws IOException {
        return Files.size(Paths.get(path));
    }

    // Reads a file as a single string.
    public static String readFileAsString(String path) throws IOException {
        return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
    }


    public static void main(String[] args) throws IOException {
        String testFile = "testfile.txt";
        String copyFile = "copyfile.txt";
        List<String> lines = new ArrayList<>();
        lines.add("Hello");
        lines.add("World");

        // Test writeFile
        writeFile(testFile, lines);
        assert fileExists(testFile);

        // Test readFile
        List<String> readLines = readFile(testFile);
        assert readLines.equals(lines);

        // Test appendToFile
        appendToFile(testFile, List.of("Appended"));
        List<String> appendedLines = readFile(testFile);
        assert appendedLines.equals(List.of("Hello", "World", "Appended"));

        // Test copyFile
        copyFile(testFile, copyFile);
        assert fileExists(copyFile);
        assert readFile(copyFile).equals(appendedLines);

        // Test getFileSize
        long size = getFileSize(testFile);
        assert size > 0;

        // Test readFileAsString
        String content = readFileAsString(testFile);
        assert content.replace("\r", "").equals("Hello\nWorld\nAppended\n");

        // Test deleteFile
        assert deleteFile(testFile);
        assert !fileExists(testFile);
        assert deleteFile(copyFile);
        assert !fileExists(copyFile);

        System.out.println("All FileUtils tests passed.");
    }
}
