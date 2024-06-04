# A syntax highlighter for the Bend programming language in JetBrains IDE!
def String/concat(a, b):
  # Concatenate Variables
  match a:
  case String/Cons:
  return String/Cons(a.head, String/concat(a. tail, b))
  case String/Nil:
  return b


def main(s):
  # Declare variables
  intro = "Hello, my name is"
  name = "Rohan Vashisht!"
  sentence = "and my age is"
  age = "18"
  # Concatenate variables
  builder_1 = String/concat(intro, name)
  builder_2 = String/concat(sentence, age)
  # TODO: print something on the screen
  return (builder_1, builder_2)
