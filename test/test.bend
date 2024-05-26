def myFunction(a, b, c):
  return a+b+c


def authenticator(name):
  if name == "asdf":
    return 1
  else:
    return 0
def main():
  if authenticator("asdf"):
    return myFunction(10, 20, 30)
  else:
    return myFunction(1, 2, 3)
