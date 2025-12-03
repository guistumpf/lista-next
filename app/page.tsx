'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { text } from "stream/consumers";

export default function Home() {
  const [tarefas, settarefas] = useState<any[]>([])
  const [input, setinput] = useState<any>("")
  const [primeiroCarregamento, setPrimeiroCarregamento] = useState(false)
  


  useEffect(() => {
    const dados = localStorage.getItem("tarefas")
    if (dados) {
      settarefas(JSON.parse(dados))
    }
    setPrimeiroCarregamento(true)
  }, [])

  
  useEffect(() => {
    if (primeiroCarregamento) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }
  }, [tarefas, primeiroCarregamento])



  function add() {
if(input.trim() === ""){
  alert("Digite uma tarefa")
return
}

    const tasks = {
      id: Date.now(),
      text: input
    }
    
    settarefas([...tarefas, tasks])
    setinput("")
  }
  
  
  function clear(){
     const confirmed = confirm("Tem certeza que deseja excluir tudo?")
    
if(confirmed){
  settarefas([])

}
  }
  
  

  console.log(tarefas)
  return (
    <section>

      <h1>Lista De Tarefas</h1>
      <input type="text" value={input} onChange={(e) => {
        setinput(e.target.value)
        console.log(e.target.value)
      }} />
      <button onClick={add}>Add</button>
      <ul>
        {tarefas.map((tarefa) => {
          return <li key={tarefa.id}>
            {tarefa.text}
          </li>
      })}
    {tarefas.length > 0 && (
      <button onClick={clear}>Delete All</button>
    )}
      </ul>

    </section>
  )
}
