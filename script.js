// Função para obter a cotação da moeda
async function obterCotacaoMoeda(base, destino) {
    const apiKey = '2340d101c4187fd9da4bfcb985741ec2' ; // Substitua por sua chave de API
    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${base}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao obter a cotação. Verifique se a moeda base é válida.');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.type || 'Erro na API.');
        }

        const taxa = data.rates[destino];

        if (!taxa) {
            throw new Error(`A moeda de destino ${destino} não está disponível.`);
        }

        return taxa;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Função de exemplo para converter um valor entre duas moedas
async function exemploConversaoMoeda(valor, base, destino) {
    try {
        const taxa = await obterCotacaoMoeda(base, destino);
        const valorConvertido = valor * taxa;
        console.log(`${valor} ${base} é equivalente a ${valorConvertido.toFixed(2)} ${destino}`);
        return valorConvertido.toFixed(2);
    } catch (error) {
        console.error('Não foi possível realizar a conversão:', error.message);
    }
}

// Exemplo de uso
document.getElementById('converter').addEventListener('click', async function() {
    const valor = parseFloat(document.getElementById('valor').value);
    const base = document.getElementById('moedaBase').value;
    const destino = document.getElementById('moedaDestino').value;
    
    const resultado = await exemploConversaoMoeda(valor, base, destino);
    document.getElementById('resultado').textContent = resultado ? `Resultado: ${resultado} ${destino}` : 'Conversão falhou.';
});
