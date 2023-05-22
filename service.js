const validarEntradaDeDados = (lancamento) => {
  const { cpf, valor } = lancamento;
  let messageError = [];
  valor ?? messageError.push("Valor inválido");
  cpf ?? messageError.push("CPF inválido");

  if (messageError.length === 0) {
    Number(cpf) === NaN ||
      (!validarCpf(cpf) && messageError.push("CPF inválido"));

    valor > 15000 || (valor < -2000 && messageError.push("Valor inválido"));
  }
  return messageError.length === 0 ? null : messageError;
};

const recuperarSaldosPorConta = (lancamentos) => {
  let lancamentosEmOrdem = [];
  let resultado = [];

  lancamentos.forEach((lancamento) => {
    let duplicado =
      lancamentosEmOrdem.findIndex((armazenado) => {
        return lancamento.cpf == armazenado.cpf;
      }) > -1;

    if (!duplicado) {
      lancamentosEmOrdem.push({
        cpf: lancamento.cpf,
        valor: "",
      });
    }
  });

  lancamentosEmOrdem.forEach((lancamento) => {
    let saldo = 0;
    const items = lancamentos.filter((item) => item.cpf === lancamento.cpf);

    items.forEach(async (item) => {
      saldo += item.valor;
    });

    resultado.push({
      cpf: items[0].cpf,
      valor: Number(saldo).toFixed(2),
    });
  });

  return resultado;
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  const lancamentosDoCpf = lancamentos.filter(
    (lancamento) => lancamento.cpf === cpf
  );

  const lancamentosOrdenado = ordernarLancamento(lancamentosDoCpf);

  const maior = lancamentosOrdenado[0];
  const menor = lancamentosOrdenado.at(-1);

  return [menor, maior];
};

const recuperarMaioresSaldos = (lancamentos) => {
  let resultado = [];
  const lancamentosOrdenado = ordernarLancamento(lancamentos);

  lancamentosOrdenado.forEach((lancamento) => {
    const items = lancamentosOrdenado.filter(
      (item) => item.cpf === lancamento.cpf
    );
    let saldo = 0;

    items.forEach((item) => {
      saldo += item.valor;
    });

    let duplicado =
      resultado.findIndex((armazenado) => {
        return lancamento.cpf == armazenado.cpf;
      }) > -1;

    if (!duplicado) {
      resultado.push({
        cpf: lancamento.cpf,
        valor: Number(saldo).toFixed(2),
      });
    }
  });

  return resultado.slice(0, 3);
};

const recuperarMaioresMedias = (lancamentos) => {
  const lancamentosOrdenado = ordernarLancamento(lancamentos);

  let resultado = [];
  lancamentosOrdenado.forEach((lancamento) => {
    const items = lancamentosOrdenado.filter(
      (item) => item.cpf === lancamento.cpf
    );
    let saldo = 0;

    items.forEach((item) => {
      saldo += item.valor;
    });

    const media = saldo / items.length;

    let duplicado =
      resultado.findIndex((armazenado) => {
        return lancamento.cpf == armazenado.cpf;
      }) > -1;

    if (!duplicado) {
      resultado.push({
        cpf: lancamento.cpf,
        valor: Number(media).toFixed(2),
      });
    }
  });

  return resultado.slice(0, 3);
};

const ordernarLancamento = (lancamentos) => {
  lancamentos.sort((a, b) => {
    if (a.valor > b.valor) return -1;
    if (a.valor < b.valor) return 1;
    return 0;
  });
  return lancamentos;
};

const validarCpf = (strCPF) => {
  var sum;
  var remainder;
  sum = 0;
  if (strCPF === "00000000000") return false;

  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};
