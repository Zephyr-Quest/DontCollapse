# Substainable Development

There is 3 SDG to achieve : 
- Economic (Player profitability)
- Ecologic (Player environmental impact)
- Social  (On évite les grèves)

## Ecologic

The grade is out of 100 points. 
- 40 points are awarded for the environmental impact of the machines.
- 40 points are awarded for the environmental impact of the suppliers.
- 20 points are awarded if the machines were purchased second-hand.

As the last level of machines cannot be bought second hand, the score is balanced to make 60 points for machines and 40 on suppliers.

$$ecologic = machines +  suppliers + second-hand$$

### Machines


$$\frac{5x^4}{24} - 1.25x^3 + \frac{55x^2}{24} + 1.25x$$

the variable $x$ being the level of each machine. 

To generate the curve through the desired points, we used the Lagrangian Interpolation technique.

### Suppliers

$$2.5x$$

the variable $x$ being the level of each supplier. 

### Second-hand
5 points per machines if it's second-handed.

## Economic

Définition : Turnover is the difference between income and expenses

$$economic = \max \left(\frac{turnover}{income}\times 100~,0\right)$$

## Social

$$social = \left(\frac{ingénieurs}{total} + \frac{superviseur}{total} + \frac{maintenance}{total} + \frac{ménage}{total}\right) \times 100$$
