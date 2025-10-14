import ast
import re
import textwrap

def analyze_code(code):
    issues = []
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return [f"Syntax error: {e}"]

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            if len(node.name) < 3:
                issues.append(f"Function name '{node.name}' is too short.")
            if len(node.body) > 10:
                issues.append(f"Function '{node.name}' may be too long ({len(node.body)} lines).")

    if re.search(r'print\(.+\)', code):
        issues.append("Avoid using print statements in production code.")
    return issues


if __name__ == "__main__":
    print("=== AI Code Reviewer ===")
    user_code = textwrap.dedent("""
    def f(x):
        print(x)
        return x+1
    """)
    print("Issues found:")
    for issue in analyze_code(user_code):
        print(" -", issue)
