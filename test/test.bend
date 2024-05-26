def myFunction(a, b, c):
  return a+b+c


def checker(name):
  if name == "YO":
    return True
  else:
    return False


def main():
  if checker("YO"):
    return myFunction(10, 20, 30)
  else:
    return myFunction(1, 2, 3)
