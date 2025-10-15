package stringalg

import (
	"reflect"
	"testing"
)

func TestKMPSearch(t *testing.T) {
	cases := []struct {
		text     string
		pattern  string
		expected []int
	}{
		{"ababcabcabababd", "ababd", []int{10}},
		{"aaaaa", "aa", []int{0, 1, 2, 3}},
		{"hello world", "world", []int{6}},
		{"abcdef", "gh", nil},
		{"", "a", nil},
		{"a", "", nil},
	}

	for _, c := range cases {
		got := KMPSearch(c.text, c.pattern)
		if !reflect.DeepEqual(got, c.expected) {
			t.Fatalf("KMPSearch(%q,%q)=%v want %v", c.text, c.pattern, got, c.expected)
		}
	}
}
