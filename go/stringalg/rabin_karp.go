package stringalg

// RabinKarpSearch finds all occurrences of pattern in text using the Rabin-Karp algorithm.
// Returns the starting indices of matches.
func RabinKarpSearch(text, pattern string) []int {
	if len(pattern) == 0 || len(text) == 0 || len(pattern) > len(text) {
		return nil
	}
	const base = 256
	const mod = 1000000007

	m := len(pattern)
	n := len(text)

	var pHash, tHash, power int64
	power = 1
	for i := 0; i < m; i++ {
		pHash = (pHash*base + int64(pattern[i])) % mod
		tHash = (tHash*base + int64(text[i])) % mod
		if i < m-1 {
			power = (power * base) % mod
		}
	}

	res := make([]int, 0)
	for i := 0; i <= n-m; i++ {
		if pHash == tHash {
			// Confirm by direct comparison to avoid false positives
			match := true
			for j := 0; j < m; j++ {
				if text[i+j] != pattern[j] {
					match = false
					break
				}
			}
			if match {
				res = append(res, i)
			}
		}
		if i < n-m {
			// Slide window: remove leading char and add trailing char
			leading := (int64(text[i]) * power) % mod
			tHash = (tHash - leading + mod) % mod
			tHash = (tHash*base + int64(text[i+m])) % mod
		}
	}
	return res
}
