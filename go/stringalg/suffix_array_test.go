package stringalg

import (
	"reflect"
	"testing"
)

func TestSuffixArrayAndLCP(t *testing.T) {
	s := "banana"
	sa := BuildSuffixArray(s)
	// Known suffix array for "banana": [5, 3, 1, 0, 4, 2]
	expectedSA := []int{5, 3, 1, 0, 4, 2}
	if !reflect.DeepEqual(sa, expectedSA) {
		t.Fatalf("BuildSuffixArray(%q)=%v want %v", s, sa, expectedSA)
	}
	lcp := BuildLCP(s, sa)
	// LCP for above SA: [1,3,0,0,2,0]
	expectedLCP := []int{1, 3, 0, 0, 2, 0}
	if !reflect.DeepEqual(lcp, expectedLCP) {
		t.Fatalf("BuildLCP(%q)=%v want %v", s, lcp, expectedLCP)
	}
}

func TestSAFindAll(t *testing.T) {
	s := "abracadabra"
	sa := BuildSuffixArray(s)
	// Find all occurrences via suffix array
	indices := SAFindAll(s, sa, "abra")
	expected := []int{0, 7}
	if !reflect.DeepEqual(indices, expected) {
		t.Fatalf("SAFindAll(%q, pattern=%q)=%v want %v", s, "abra", indices, expected)
	}
}
