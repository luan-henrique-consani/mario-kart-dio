const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true){
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confronto"
      break
  }

  return result;
  
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`O ${characterName} rolou o 🎲 de ${block} e o resultado foi ${diceResult} + ${attribute}. O resultado foi ${diceResult + attribute}!`)  
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
      console.log(`🏁 Rodada ${round}`)

      // sortear bloco

      let block = await getRandomBlock();
      console.log(`Bloco ${block}`)

      // rolar os dados

      let diceResult1 = await rollDice();
      let diceResult2 = await rollDice();

      // teste de habilidades

      let totalTestSkills1 = 0;
      let totalTestSkills2 = 0;

      if(block === "Reta"){
        totalTestSkills1 = diceResult1 + character1.velocidade;
        totalTestSkills2 = diceResult2 + character2.velocidade;

        await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
        await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);

      }
      if(block === "Curva"){
        totalTestSkills1 = diceResult1 + character1.manobrabilidade;
        totalTestSkills2 = diceResult2 + character2.manobrabilidade;

        await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
        await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);

      }
      if(block === "Confronto"){
        let powerResult1 = diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;

        console.log(`O ${character1.nome} confrontou o ${character2.nome}! 🥊`);

        await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
        await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

        if(powerResult1 > powerResult2 && character2.pontos > 0){
          console.log(`O ${character1.nome} ganhou! E o ${character2.nome} perdeu 1 ponto.`);
          character2.pontos--;
        }
        if(powerResult1 < powerResult2 && character1.pontos > 0){
          console.log(`O ${character2.nome} ganhou! E o ${character1.nome} perdeu 1 ponto.`);
          character1.pontos--;
        }
        console.log(powerResult1 === powerResult2 ? 'Confronto está empatado!' : '');
      }

      if(totalTestSkills1 > totalTestSkills2){
        console.log(`O ${character1.nome} marcou 1 ponto!`);
        character1.pontos++;
      }else if(totalTestSkills1 < totalTestSkills2){
        console.log(`O ${character2.nome} marcou 1 ponto!`);
        character2.pontos++;
      }

      console.log('-------------------------\n')
    }
}

async function declareWinner(character1, character2) {
  console.log(`O ${character1.nome} fez ${character1.pontos} pontos`);
  console.log(`O ${character2.nome} fez ${character2.pontos} pontos`);
  console.log('\n');

  if(character1.pontos > character2.pontos){
    console.log(`O grande ganhador dessa corrida foi o ${character1.nome} 🏆!`);
  }else if(character1.pontos < character2.pontos){
    console.log(`O grande ganhador dessa corrida foi o ${character2.nome} 🏆!`);
  }else if(character1.pontos === character2.pontos){
    console.log(`A corrida empatou!`);
  }
}

(async function main() {
  console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...
    `);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
