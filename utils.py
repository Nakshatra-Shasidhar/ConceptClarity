def clean_output(text: str) -> str:
    """
    Clean raw AI output to make it user-friendly.
    """

    if not text:
        return "No explanation generated."

    # Remove new lines
    cleaned = text.replace("\n", " ")

    # Remove extra spaces
    cleaned = " ".join(cleaned.split())

    # Limit very long output
    max_length = 400
    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length] + "..."

    return cleaned.strip()
