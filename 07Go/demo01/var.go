package main

import "fmt"

func SayHello() {
	var str string = "hello world"
	var colors [10]string
	colors[0] = "aaa"
	fmt.Println(str, colors[0])
}

func main() {
	SayHello()
}
