public class RemoveDuplicateString {

    public static void duplicateString(String str,int index, StringBuilder newStr, boolean map[]) {

        if (index ==str.length()) {

            System.out.println(newStr);
            return;
        }

//		kam

        char currchar=str.charAt(index);

        if (map[currchar-'a'] ==true) {

//			duplicute
            duplicateString(str, index+1, newStr, map);
        }
        else {
            map[currchar-'a']=true;

            duplicateString(str, index+1, newStr.append(currchar), map);
        }
    }

    public static void duplicate(String str, int index,StringBuilder newstr,boolean map[]) {

        if (index==str.length()) {

            System.out.println(newstr);
            return;
        }

//		kam

        char c=str.charAt(index);
        if (map[c-'a']==true) {

            duplicate(str, index+1, newstr, map);
        }

        else {
            map[c-'a']=true;

            duplicate(str, index+1, newstr.append(c), map);
        }

    }

    public static void main(String[] args) {
        String s="somnathsss";

        int ss='s'-'a';
        System.out.println(ss);
        duplicate(s, 0, new StringBuilder(""), new boolean [26]);

    }
}

