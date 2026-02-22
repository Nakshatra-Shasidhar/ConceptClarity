from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re

# Load smaller faster model
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")


def analyze_query(query):
    query = query.strip()

    if not query:
        return "Please enter a scientific term."

    # Only block obvious non-scientific greetings
    non_scientific_words = ["hello", "hi", "hey", "joke", "fun"]
    if query.lower() in non_scientific_words:
        return "Please enter a valid scientific term."

    prompt = (
        f"Explain the scientific term '{query}' clearly. "
        f"Write exactly 2 to 3 complete sentences. "
        f"Do not repeat the question. Give only explanation."
    )

    inputs = tokenizer(prompt, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_length=120,
        num_beams=4,
        early_stopping=True
    )

    result = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    # Remove accidental prompt echo
    result = result.replace(prompt, "").strip()

    # Clean formatting
    result = re.sub(r"\s+", " ", result)

    return result
