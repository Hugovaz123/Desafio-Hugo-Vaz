import java.util.HashMap;

public class Lanchonete {

    private HashMap<String, Double> cardapio;

    public Lanchonete() {
        cardapio = new HashMap<>();
        cardapio.put("cafe", 3.00);
        cardapio.put("chantily", 1.50);
        cardapio.put("suco", 6.20);
        cardapio.put("sanduiche", 6.50);
        cardapio.put("queijo", 2.00);
        cardapio.put("salgado", 7.25);
        cardapio.put("combo1", 9.50);
        cardapio.put("combo2", 7.50);
    }

    public double calcularValorDaCompra(String[] itens, String formaDePagamento) {
        if (itens.length == 0) {
            return -1.0; // Quantidade inválida
        }

        double valorTotal = 0.0;
        boolean pagamentoValido = formaDePagamento.equals("dinheiro") || formaDePagamento.equals("debito")
                || formaDePagamento.equals("credito");

        if (!pagamentoValido) {
            return -2.0; // Forma de pagamento inválida
        }

        boolean temPrincipal = false;
        for (String item : itens) {
            if (!cardapio.containsKey(item)) {
                return -3.0; // Item inválido
            }

            if (!item.equals("chantily") && !item.equals("queijo") && !item.equals("chantily")) {
                temPrincipal = true;
            }

            valorTotal += cardapio.get(item);
        }

        if (!temPrincipal) {
            return -4.0; // Item extra sem o principal
        }

        if (formaDePagamento.equals("dinheiro")) {
            valorTotal *= 0.95; // Desconto de 5% no pagamento em dinheiro
        } else if (formaDePagamento.equals("credito")) {
            valorTotal *= 1.03; // Acréscimo de 3% no pagamento a crédito
        }

        return valorTotal;
    }

    public static void main(String[] args) {
        Lanchonete lanchonete = new Lanchonete();

        String[] pedido = {"suco", "sanduiche", "queijo"};
        String formaDePagamento = "dinheiro";

        double valorTotal = lanchonete.calcularValorDaCompra(pedido, formaDePagamento);
        if (valorTotal == -1.0) {
            System.out.println("Não há itens no carrinho de compra!");
        } else if (valorTotal == -2.0) {
            System.out.println("Forma de pagamento inválida!");
        } else if (valorTotal == -3.0) {
            System.out.println("Item inválido!");
        } else if (valorTotal == -4.0) {
            System.out.println("Item extra não pode ser pedido sem o principal.");
        } else {
            System.out.println("Valor total: R$" + valorTotal);
        }
    }
}