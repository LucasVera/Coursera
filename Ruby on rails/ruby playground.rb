#puts 3

a=3

if a==3
	puts "a is 3"
elsif a==5
	puts "a is 5"
else
	puts "a is not 3 or 5"
end

times = 5

times *= 2 while times<100
puts times

#nil = seria null ()
# todo es true, lo unico false es el mismo false y el nil.

# para definir un metodo se usa def ... end
# no necesita parentesis pero se pueden poner
def simple
	puts "no parens"
end

# los parametros no necesitan definir un typo

def add(one, two)
	one + two
end

# return es opcional... la ultima línea es la que se le
# hace el return. aunque se puede ejecutar el return
# prematuramente
# los metodos pueden terminar con ? o con !
# ? --> predicate methods:
# => 	def can_divide_by?(number)
# => 		return false if number.zero?
# =>  		true
# =>  	end
# el ! indica un efecto secundario peligroso: replace, place, etc

# existe el ternary operator como condition ? true : false
# se puede poner default en un metodo, def factorial_with_default(n=5)
# si se llama sin parametros, n=5

# splat: permite que un metodo tenga unos parametros como unos args
# sin saber cuantos argumentos se le estan pasando, el los convierte
# a un array y ya se pueden trabajar como se quiera.
def max(one_parm, *numbers, another)
	numbers.max
end

puts max("parm1", 7, -32, 10, "another parm")


# blocks: se trata de un bloque de codigo ejecutable, denotado por
# {} o por do .. end. se pueden usar parametros entre ||. la idea
# de un block es que se use de manera iterativa.
# ejemplo:
# 1.times {puts "Hello world"}
# 2.times do |index|
# => 	if index > 0
# =>  		puts index
# => 	end
# => end











