// dart/greedy_algorithms.dart
// Implements three classic greedy algorithms in Dart:
// 1) Activity Selection
// 2) Huffman Coding
// 3) Job Scheduling

import 'dart:collection';

// -----------------------------
// Activity Selection
// -----------------------------
List<int> activitySelection(List<int> start, List<int> finish) {
  if (start.length != finish.length) {
    throw ArgumentError('start and finish must have same length');
  }
  final n = start.length;
  final indices = List<int>.generate(n, (i) => i);
  indices.sort((a, b) => finish[a].compareTo(finish[b]));

  final selected = <int>[];
  int lastFinish = -1;
  for (final i in indices) {
    if (start[i] > lastFinish) {
      selected.add(i);
      lastFinish = finish[i];
    }
  }
  return selected;
}

// -----------------------------
// Huffman Coding
// -----------------------------
class HuffmanNode {
  int freq;
  String? ch;
  HuffmanNode? left;
  HuffmanNode? right;

  HuffmanNode(this.freq, {this.ch, this.left, this.right});

  bool get isLeaf => left == null && right == null;
}

Map<String, String> buildHuffmanCodes(Map<String, int> freqs) {
  if (freqs.isEmpty) return {};

  final nodes = <HuffmanNode>[];
  freqs.forEach((ch, f) => nodes.add(HuffmanNode(f, ch: ch)));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    final a = nodes.removeAt(0);
    final b = nodes.removeAt(0);
    final merged = HuffmanNode(a.freq + b.freq, left: a, right: b);
    nodes.add(merged);
  }

  final root = nodes.first;
  final codes = <String, String>{};

  void dfs(HuffmanNode? node, String code) {
    if (node == null) return;
    if (node.isLeaf && node.ch != null) {
      codes[node.ch!] = code.isEmpty ? '0' : code;
      return;
    }
    dfs(node.left, code + '0');
    dfs(node.right, code + '1');
  }

  dfs(root, '');
  return codes;
}

// -----------------------------
// Job Scheduling
// -----------------------------
class Job {
  final String id;
  final int deadline;
  final int profit;
  Job(this.id, this.deadline, this.profit);
}

List<String> scheduleJobs(List<Job> jobs) {
  if (jobs.isEmpty) return [];
  jobs.sort((a, b) => b.profit.compareTo(a.profit));

  final maxDeadline = jobs.map((j) => j.deadline).reduce((a, b) => a > b ? a : b);
  final slots = List<String?>.filled(maxDeadline + 1, null);

  for (final job in jobs) {
    for (int slot = job.deadline; slot >= 1; slot--) {
      if (slot < slots.length && slots[slot] == null) {
        slots[slot] = job.id;
        break;
      }
    }
  }

  final result = <String>[];
  for (int i = 1; i < slots.length; i++) {
    if (slots[i] != null) result.add(slots[i]!);
  }
  return result;
}

void main() {
  print('--- Activity Selection ---');
  final starts = [1, 3, 0, 5, 8, 5];
  final finishes = [2, 4, 6, 7, 9, 9];
  final chosen = activitySelection(starts, finishes);
  print('Activities chosen: $chosen');

  print('\\n--- Huffman Coding ---');
  final freqs = {'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45};
  final codes = buildHuffmanCodes(freqs);
  codes.forEach((ch, code) => print('  $ch : $code'));

  print('\\n--- Job Scheduling ---');
  final jobs = [
    Job('J1', 2, 100),
    Job('J2', 1, 19),
    Job('J3', 2, 27),
    Job('J4', 1, 25),
    Job('J5', 3, 15),
  ];
  final scheduled = scheduleJobs(jobs);
  print('Scheduled jobs: $scheduled');
}
