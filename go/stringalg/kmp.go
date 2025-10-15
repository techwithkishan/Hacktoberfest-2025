package stringalg

func KMPSearch(text, pattern string) []int {
	if len(pattern) == 0 || len(text) == 0 || len(pattern) > len(text) {
		return nil
	}
	lps := buildLPS(pattern)
	res := make([]int, 0)
	i, j := 0, 0
	for i < len(text) {
		if text[i] == pattern[j] {
			i++
			j++
			if j == len(pattern) {
				res = append(res, i-j)
				j = lps[j-1]
			}
			continue
		}
		if j != 0 {
			j = lps[j-1]
		} else {
			i++
		}
	}
	return res
}

func buildLPS(p string) []int {
	lps := make([]int, len(p))
	length := 0
	for i := 1; i < len(p); {
		if p[i] == p[length] {
			length++
			lps[i] = length
			i++
		} else {
			if length != 0 {
				length = lps[length-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}
	return lps
}
