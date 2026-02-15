"""
prompt.py

This file builds the prompt used to generate
simple scientific explanations in ConceptClarity.
"""

def build_prompt(term):
    """
    Creates a simple and beginner-friendly prompt
    for the given scientific term.

    Parameters:
        term (str): Scientific term entered by the user

    Returns:
        str: Formatted prompt string
    """

    if not term:
        return ""

    return f"""
Explain the following scientific term in simple,
beginner-friendly language with a small real-life example.

Term: {term}
"""
