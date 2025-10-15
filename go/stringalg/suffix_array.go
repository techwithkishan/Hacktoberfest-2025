package stringalg

import "sort"

func BuildSuffixArray(s string) []int {
	n := len(s)
	if n == 0 {
		return nil
	}
	sa := make([]int, n)
	rank := make([]int, n)
	tmp := make([]int, n)
	for i := 0; i < n; i++ {
		sa[i] = i
		rank[i] = int(s[i])
	}
	for k := 1; k < n; k <<= 1 {
		sort.Slice(sa, func(i, j int) bool {
			ri, rj := rank[sa[i]], rank[sa[j]]
			ri2, rj2 := -1, -1
			if sa[i]+k < n {
				ri2 = rank[sa[i]+k]
			}
			if sa[j]+k < n {
				rj2 = rank[sa[j]+k]
			}
			if ri != rj {
				return ri < rj
			}
			return ri2 < rj2
		})
		tmp[sa[0]] = 0
		classes := 1
		for i := 1; i < n; i++ {
			prev, cur := sa[i-1], sa[i]
			prev1, cur1 := rank[prev], rank[cur]
			prev2, cur2 := -1, -1
			if prev+k < n {
				prev2 = rank[prev+k]
			}
			if cur+k < n {
				cur2 = rank[cur+k]
			}
			if prev1 != cur1 || prev2 != cur2 {
				classes++
			}
			tmp[cur] = classes - 1
		}
		copy(rank, tmp)
		if classes == n {
			break
		}
	}
	return sa
}

func BuildLCP(s string, sa []int) []int {
	n := len(s)
	if n == 0 || len(sa) != n {
		return nil
	}
	rank := make([]int, n)
	for i := 0; i < n; i++ {
		rank[sa[i]] = i
	}
	lcp := make([]int, n)
	k := 0
	for i := 0; i < n; i++ {
		r := rank[i]
		if r == n-1 {
			k = 0
			continue
		}
		j := sa[r+1]
		for i+k < n && j+k < n && s[i+k] == s[j+k] {
			k++
		}
		lcp[r] = k
		if k > 0 {
			k--
		}
	}
	return lcp
}

func SAFindAll(s string, sa []int, pattern string) []int {
	n, m := len(s), len(pattern)
	if m == 0 || n == 0 || m > n {
		return nil
	}
	// lower bound
	lo, hi := 0, n
	for lo < hi {
		mid := (lo + hi) / 2
		cmp := prefixCompare(s[sa[mid]:], pattern)
		if cmp < 0 {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	start := lo
	// upper bound
	lo, hi = 0, n
	for lo < hi {
		mid := (lo + hi) / 2
		cmp := prefixCompare(s[sa[mid]:], pattern)
		if cmp <= 0 {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	end := lo
	if start >= end {
		return nil
	}
	res := make([]int, 0, end-start)
	for i := start; i < end; i++ {
		res = append(res, sa[i])
	}
	sort.Ints(res)
	return res
}

func prefixCompare(a, b string) int {
	la, lb := len(a), len(b)
	l := lb
	if la < l {
		l = la
	}
	for i := 0; i < l; i++ {
		if a[i] != b[i] {
			if a[i] < b[i] {
				return -1
			}
			return 1
		}
	}
	if len(b) == l {
		return 0
	}
	return -1
}
