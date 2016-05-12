inputFile = open("vocab.txt")
output="["
lista=[]
for word in inputFile.readlines():
	lista.append("'%s '" %word.strip())
body=",".join(lista)

output="["+body+ "]"
print output