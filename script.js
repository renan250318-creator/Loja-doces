function pedirProduto(produto, botao) {

    const TELEFONE = "5511961104153"

    // container do produto clicado
    let container = botao.closest(".info")

    // inputs
    let nomeInput = container.querySelector(".nome")
    let qtdInput = container.querySelector(".quantidade")

    // valores
    let nome = nomeInput.value.trim()
    let quantidade = qtdInput.value.trim()

    // validação
    if (!nome || !quantidade || quantidade <= 0) {
        alert("Preencha corretamente os campos")
        return
    }

    // desabilita botão (evita múltiplos cliques)
    botao.disabled = true
    let textoOriginal = botao.innerText
    botao.innerText = "Enviando..."

    // dados para o Google Sheets
    let dados = {
        nome: nome,
        produto: produto,
        quantidade: quantidade
    }

    fetch("https://script.google.com/macros/s/AKfycbzNdy1WgvCy4EWBcIXT80nWbzq9A43NMFTXjUSYIuWiEztR9HqsXS-gKpCDe3lNuBjs/exec", {
        method: "POST",
        body: JSON.stringify(dados)
    })
    
    .then(() => {

        // mensagem WhatsApp
        let mensagem = 
`Olá! Meu nome é ${nome}

Gostaria de pedir:
🧁 Produto: ${produto}
📦 Quantidade: ${quantidade}`

        let url = "https://api.whatsapp.com/send?phone=" 
            + TELEFONE + 
            "&text=" + encodeURIComponent(mensagem)

        window.open(url, "_blank")

        // limpa os campos
        nomeInput.value = ""
        qtdInput.value = ""

        // feedback simples
        alert("Pedido enviado com sucesso! ✅")

        // reativa botão
        botao.disabled = false
        botao.innerText = textoOriginal
    })
    .catch(() => {
        alert("Erro ao enviar pedido")

        // reativa botão em caso de erro
        botao.disabled = false
        botao.innerText = textoOriginal
    })
}
