package main

import (
	"fmt"
	"sort"

	"github.com/your/module/stringalg"
)

func main() {
	// KMP example
	text := "ababcabcabababd"
	pattern := "ababd"
	fmt.Println("KMP:", stringalg.KMPSearch(text, pattern))

	// Rabin-Karp example
	fmt.Println("Rabin-Karp:", stringalg.RabinKarpSearch("abracadabra", "abra"))

	// Suffix Array examples
	s := "banana"
	sa := stringalg.BuildSuffixArray(s)
	lcp := stringalg.BuildLCP(s, sa)
	fmt.Println("Suffix Array:", sa)
	fmt.Println("LCP:", lcp)

	// Find all occurrences using suffix array binary search
	indices := stringalg.SAFindAll("abracadabra", stringalg.BuildSuffixArray("abracadabra"), "abra")
	sort.Ints(indices)
	fmt.Println("SA FindAll:", indices)
}
