import Itau from '../../img/Bank/Itau.png';
import Nubank from '../../img/Bank/Nubank.png';
import BancoDoBrasil from '../../img/Bank/Banco do Brasil.png';
import Santander from '../../img/Bank/Santander.png';
import CaixaEconomicaFederal from '../../img/Bank/Caixa Econômica Federal.jpeg';
import Bradesco from '../../img/Bank/Bradesco.png';
import BancoInter from '../../img/Bank/Banco Inter.png';
import BTGPactual from '../../img/Bank/BTG Pactual.png';
import XPInvestimentos from '../../img/Bank/XP Investimentos.png';
import BancoOriginal from '../../img/Bank/Banco Original.png';
import BancoSafra from '../../img/Bank/Banco Safra.png';
import BancoPan from '../../img/Bank/Banco Pan.png';
import C6Bank from '../../img/Bank/C6 Bank.png';

const bankLogos: { [key: string]: { logo: string, color: string } } = {
  'Itau': { logo: Itau, color: '#FF6600' },
  'Nubank': { logo: Nubank, color: '#8A05BE' },
  'Banco do Brasil': { logo: BancoDoBrasil, color: '#0033A0' },
  'Santander': { logo: Santander, color: '#EC0000' },
  'Caixa Econômica Federal': { logo: CaixaEconomicaFederal, color: '#0047BB' },
  'Bradesco': { logo: Bradesco, color: '#CC092F' },
  'Banco Inter': { logo: BancoInter, color: '#FF7A00' },
  'BTG Pactual': { logo: BTGPactual, color: '#003366' },
  'XP Investimentos': { logo: XPInvestimentos, color: '#FFCC00' },
  'Banco Original': { logo: BancoOriginal, color: '#00A859' },
  'Banco Safra': { logo: BancoSafra, color: '#002D72' },
  'Banco Pan': { logo: BancoPan, color: '#0033A0' },
  'C6 Bank': { logo: C6Bank, color: '#000000' },
};

export default bankLogos;