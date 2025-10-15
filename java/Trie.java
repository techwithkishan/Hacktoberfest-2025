import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Trie {
    private static class Node {
        Map<Character, Node> children;
        boolean isWord;

        Node(boolean treeOrdered) {
            this.children = treeOrdered ? new TreeMap<>() : new HashMap<>();
            this.isWord = false;
        }
    }

    private final Node root;
    private final boolean ordered;
    private int size;

    public Trie() {
        this(true);
    }

    public Trie(boolean orderedTraversal) {
        this.ordered = orderedTraversal;
        this.root = new Node(orderedTraversal);
        this.size = 0;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void insert(String word) {
        if (word == null) throw new IllegalArgumentException("word must not be null");
        if (word.isEmpty()) return;
        Node curr = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            Node next = curr.children.get(c);
            if (next == null) {
                next = new Node(ordered);
                curr.children.put(c, next);
            }
            curr = next;
        }
        if (!curr.isWord) {
            curr.isWord = true;
            size++;
        }
    }

    public boolean contains(String word) {
        if (word == null) throw new IllegalArgumentException("word must not be null");
        if (word.isEmpty()) return false;
        Node node = traverse(word);
        return node != null && node.isWord;
    }

    public boolean startsWith(String prefix) {
        if (prefix == null) throw new IllegalArgumentException("prefix must not be null");
        if (prefix.isEmpty()) return true;
        return traverse(prefix) != null;
    }

    public List<String> autocomplete(String prefix) {
        if (prefix == null) throw new IllegalArgumentException("prefix must not be null");
        List<String> results = new ArrayList<>();
        if (prefix.isEmpty()) {
            collect(root, new StringBuilder(), results);
            return results;
        }
        Node node = traverse(prefix);
        if (node == null) return results;
        collect(node, new StringBuilder(prefix), results);
        return results;
    }

    private Node traverse(String s) {
        Node curr = root;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            Node next = curr.children.get(c);
            if (next == null) return null;
            curr = next;
        }
        return curr;
    }

    private void collect(Node node, StringBuilder path, List<String> out) {
        if (node.isWord) out.add(path.toString());
        for (Map.Entry<Character, Node> e : node.children.entrySet()) {
            path.append(e.getKey());
            collect(e.getValue(), path, out);
            path.setLength(path.length() - 1);
        }
    }
}
