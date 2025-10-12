import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class CalculatorGUI extends JFrame implements ActionListener {
    
    private static JTextField textField;
    private String s0, s1, s2;

    public CalculatorGUI() {
        s0 = s1 = s2 = "";

        setTitle("Calculator");
        setSize(300, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        textField = new JTextField(16);
        textField.setEditable(false);
        textField.setHorizontalAlignment(JTextField.RIGHT);
        textField.setFont(new Font("Arial", Font.BOLD, 24));

        String[] buttonLabels = {
            "7", "8", "9", "/", 
            "4", "5", "6", "*", 
            "1", "2", "3", "-", 
            "0", ".", "C", "+", 
            "="
        };

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(5, 4, 10, 10));

        for (String label : buttonLabels) {
            JButton button = new JButton(label);
            button.setFont(new Font("Arial", Font.BOLD, 20));
            button.addActionListener(this);
            buttonPanel.add(button);
        }

        
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout(10, 10));
        panel.setBackground(Color.LIGHT_GRAY);
        panel.add(textField, BorderLayout.NORTH);
        panel.add(buttonPanel, BorderLayout.CENTER);

        add(panel);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String s = e.getActionCommand();

        if ((s.charAt(0) >= '0' && s.charAt(0) <= '9') || s.equals(".")) {
            if (!s1.equals("")) s2 += s;
            else s0 += s;
            textField.setText(s0 + s1 + s2);
        } 
        else if (s.equals("C")) {
            s0 = s1 = s2 = "";
            textField.setText("");
        } 
        else if (s.equals("=")) {
            double result = 0;
            try {
                double d1 = Double.parseDouble(s0);
                double d2 = Double.parseDouble(s2);
                switch (s1) {
                    case "+": result = d1 + d2; break;
                    case "-": result = d1 - d2; break;
                    case "*": result = d1 * d2; break;
                    case "/": result = d2 != 0 ? d1 / d2 : Double.NaN; break;
                }
                textField.setText(s0 + s1 + s2 + "=" + result);
                s0 = Double.toString(result);
                s1 = s2 = "";
            } catch (Exception ex) {
                textField.setText("Error");
            }
        } 
        else {
            if (s1.equals("") || s2.equals("")) s1 = s;
            else {
                double result = 0;
                double d1 = Double.parseDouble(s0);
                double d2 = Double.parseDouble(s2);
                switch (s1) {
                    case "+": result = d1 + d2; break;
                    case "-": result = d1 - d2; break;
                    case "*": result = d1 * d2; break;
                    case "/": result = d2 != 0 ? d1 / d2 : Double.NaN; break;
                }
                s0 = Double.toString(result);
                s1 = s;
                s2 = "";
            }
            textField.setText(s0 + s1 + s2);
        }
    }

    public static void main(String[] args) {
        new CalculatorGUI();
    }
}
