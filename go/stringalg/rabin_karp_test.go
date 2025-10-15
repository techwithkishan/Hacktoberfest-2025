package stringalg

import (
	"reflect"
	"testing"
)

func TestRabinKarpSearch(t *testing.T) {
	cases := []struct {
		text     string
		pattern  string
		expected []int
	}{
		{"abracadabra", "abra", []int{0, 7}},
		{"aaaaa", "aa", []int{0, 1, 2, 3}},
		{"abcdefgh", "xyz", nil},
		{"", "a", nil},
		{"a", "", nil},
	}
	for _, c := range cases {
		got := RabinKarpSearch(c.text, c.pattern)
		if !reflect.DeepEqual(got, c.expected) {
			t.Fatalf("RabinKarpSearch(%q,%q)=%v want %v", c.text, c.pattern, got, c.expected)
		}
	}
}
