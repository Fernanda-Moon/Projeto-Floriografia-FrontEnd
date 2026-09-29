/* ==========================================================================
   FLORIOGRAFIA — lógica completa (v12 · cores dinâmicas + sidebar fix)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DADOS
   -------------------------------------------------------------------------- */
const FEELINGS = [
  { id:'Amor',          label:'Amor',          emoji:'❤️', color:'#ef4444', file:'amor.png',          desc:'Paixão, romance e entrega.' },
  { id:'Alegria',       label:'Alegria',       emoji:'⭐', color:'#fbbf24', file:'alegria.png',       desc:'Luz, energia e bons momentos.' },
  { id:'Amizade',       label:'Amizade',       emoji:'💚', color:'#22c55e', file:'amizade.png',       desc:'Lealdade, parceria e cuidado.' },
  { id:'Saudade',       label:'Saudade',       emoji:'💧', color:'#3b82f6', file:'saudade.png',       desc:'Memória, ausência e afeto.' },
  { id:'Tranquilidade', label:'Tranquilidade', emoji:'🟣', color:'#c084fc', file:'tranquilidade.png', desc:'Paz, equilíbrio e serenidade.' },
  { id:'Esperança',     label:'Esperança',     emoji:'🕊️', color:'#f5f3ff', file:'esperanca.png',     desc:'Renovação, fé e recomeço.' },
  { id:'Gratidão',      label:'Gratidão',      emoji:'🙏', color:'#10b981', file:'gratidao.png',      desc:'Reconhecimento, obrigado e retribuição.' },
  { id:'Coragem',       label:'Coragem',       emoji:'🔥', color:'#dc2626', file:'coragem.png',       desc:'Força, bravura e determinação.' },
  { id:'Memória',       label:'Memória',       emoji:'🕯️', color:'#6b7280', file:'memoria.png',       desc:'Lembrança, eternidade e homenagem.' },
  { id:'Renovação',     label:'Renovação',     emoji:'🌱', color:'#84cc16', file:'renovacao.png',     desc:'Recomeço, primavera e novo ciclo.' },
  { id:'Prosperidade',  label:'Prosperidade',  emoji:'🍀', color:'#eab308', file:'prosperidade.png',  desc:'Abundância, sorte e conquistas.' },
  { id:'Admiração',     label:'Admiração',     emoji:'✨', color:'#8b5cf6', file:'admiracao.png',     desc:'Respeito, encanto e reverência.' },
  { id:'Espiritualidade',label:'Espiritualidade',emoji:'🪷',color:'#a78bfa',file:'espiritualidade.png',desc:'Elevação, fé e conexão interior.' },
  { id:'Pureza',        label:'Pureza',        emoji:'🕊️', color:'#f8fafc', file:'pureza.png',        desc:'Inocência, sinceridade e paz.' },
  { id:'Paixão',        label:'Paixão',        emoji:'💋', color:'#e11d48', file:'paixao.png',        desc:'Desejo, intensidade e fogo.' },
  { id:'Sorte',         label:'Sorte',         emoji:'🎲', color:'#22c55e', file:'sorte.png',         desc:'Fortuna, acaso e bons presságios.' },
  { id:'Resiliência',   label:'Resiliência',   emoji:'🪨', color:'#78716c', file:'resiliencia.png',   desc:'Superação, força e recomeço.' },
  { id:'Serenidade',    label:'Serenidade',    emoji:'🧘', color:'#67e8f9', file:'serenidade.png',    desc:'Calma profunda, paz interior.' },
  { id:'Encanto',       label:'Encanto',       emoji:'💫', color:'#f472b6', file:'encanto.png',       desc:'Fascínio, beleza e magia.' }
];

const COLORS = [
  { id:'Vermelho', label:'Vermelho', hex:'#ef4444' },
  { id:'Rosa',     label:'Rosa',     hex:'#ec4899' },
  { id:'Amarelo',  label:'Amarelo',  hex:'#fbbf24' },
  { id:'Laranja',  label:'Laranja',  hex:'#f97316' },
  { id:'Azul',     label:'Azul',     hex:'#3b82f6' },
  { id:'Roxo',     label:'Roxo',     hex:'#a855f7' },
  { id:'Lilás',    label:'Lilás',    hex:'#c084fc' },
  { id:'Branco',   label:'Branco',   hex:'#f5f3ff' },
  { id:'Preto',    label:'Preto',    hex:'#1a1a1a' },
  { id:'Verde',    label:'Verde',    hex:'#22c55e' },
  { id:'Dourado',  label:'Dourado',  hex:'#d4af37' },
  { id:'Bordô',    label:'Bordô',    hex:'#7f1d1d' },
  { id:'Coral',    label:'Coral',    hex:'#fb7185' },
  { id:'Pêssego',  label:'Pêssego',  hex:'#fdba74' },
  { id:'Turquesa', label:'Turquesa', hex:'#2dd4bf' },
  { id:'Cinza',    label:'Cinza',    hex:'#9ca3af' },
  { id:'Bege',     label:'Bege',     hex:'#fef3c7' },
  { id:'Salmão',   label:'Salmão',   hex:'#fda4af' },
  { id:'Púrpura',  label:'Púrpura',  hex:'#7e22ce' },
  { id:'Marrom',   label:'Marrom',   hex:'#78350f' }
];

const MEANING_FILTERS = FEELINGS.map(f => f.label);

const OCCASIONS = [
  { id:'namorados',   label:'Dia dos Namorados',   emoji:'💘', desc:'Para dizer "eu te amo" sem palavras.' },
  { id:'casamento',   label:'Casamento',           emoji:'💍', desc:'Celebre a união com elegância.' },
  { id:'aniversario', label:'Aniversário',         emoji:'🎂', desc:'Um parabéns que floresce.' },
  { id:'desculpas',   label:'Pedido de Desculpas', emoji:'🙏', desc:'Quando o coração pede recomeço.' },
  { id:'amizade',     label:'Amizade',             emoji:'🤝', desc:'Para quem caminha ao seu lado.' },
  { id:'gratidao',    label:'Gratidão',            emoji:'🌷', desc:'Obrigado por existir na minha vida.' },
  { id:'condolencias',label:'Condolências',        emoji:'🕯️', desc:'Presença silenciosa em momento difícil.' },
  { id:'parabens',    label:'Parabéns',            emoji:'🎉', desc:'Conquistas merecem flores.' },
  { id:'maes',        label:'Dia das Mães',        emoji:'👩‍👧', desc:'Para quem te deu a vida e o cuidado.' },
  { id:'pais',        label:'Dia dos Pais',        emoji:'👨‍👦', desc:'Honre quem te ensinou a caminhar.' },
  { id:'formatura',   label:'Formatura',           emoji:'🎓', desc:'Celebre a conquista do conhecimento.' },
  { id:'nascimento',  label:'Nascimento',          emoji:'👶', desc:'Boas-vindas a uma nova vida.' },
  { id:'recomeco',    label:'Recomeço',            emoji:'🌅', desc:'Para novos começos e segundas chances.' },
  { id:'superacao',   label:'Superação',           emoji:'💪', desc:'Vitória sobre desafios e obstáculos.' },
  { id:'despedida',   label:'Despedida',           emoji:'👋', desc:'Até logo, com carinho e memória.' },
  { id:'boasvindas',  label:'Boas-vindas',         emoji:'🚪', desc:'Receba alguém especial com alegria.' },
  { id:'anonovo',     label:'Ano Novo',            emoji:'🎆', desc:'Renovação e esperança para o ciclo que começa.' },
  { id:'mulher',      label:'Dia da Mulher',       emoji:'♀️', desc:'Celebre a força e a beleza feminina.' },
  { id:'amigo',       label:'Dia do Amigo',        emoji:'🫂', desc:'Para celebrar a amizade verdadeira.' },
  { id:'pascoa',      label:'Páscoa',              emoji:'🐣', desc:'Renascimento e renovação da fé.' },
  { id:'natal',       label:'Natal',               emoji:'🎄', desc:'Celebre o amor e a união em família.' },
  { id:'pedido',      label:'Pedido de Casamento', emoji:'💎', desc:'O momento mais importante da vida a dois.' },
  { id:'agradecimento',label:'Agradecimento',      emoji:'💌', desc:'Um obrigado especial e sincero.' },
  { id:'espiritual',  label:'Cerimônia Espiritual',emoji:'🕉️', desc:'Para momentos de fé e conexão interior.' },
  { id:'empresa',     label:'Homenagem Empresarial',emoji:'🏆', desc:'Reconhecimento profissional e conquistas.' },
  { id:'solidariedade',label:'Solidariedade',      emoji:'🤲', desc:'Apoio em momentos de necessidade.' }
];

const FLOWERS = [
  { id:'rosa-vermelha', name:'Rosa Vermelha', sci:'Rosa spp.', emoji:'🌹', file:'rosa_vermelha.png',
    feelings:['Amor'], meanings:['Amor profundo','Paixão','Desejo','Romance'],
    colors:['Vermelho'], category:'Amor', origin:'Ásia', season:'Primavera / Verão',
    about:'A rosa vermelha é o símbolo máximo do amor e da paixão. É a flor mais associada a pedidos e declarações sinceras.',
    occasions:['Dia dos Namorados','Casamento','Aniversário','Pedido de Desculpas'] },
  { id:'girassol', name:'Girassol', sci:'Helianthus annuus', emoji:'🌻', file:'girassol.png',
    feelings:['Alegria','Esperança'], meanings:['Alegria','Positividade','Vitalidade'],
    colors:['Amarelo'], category:'Alegria', origin:'América do Norte', season:'Verão',
    about:'O girassol gira em direção ao sol. É a flor da energia, do otimismo e da lealdade.',
    occasions:['Aniversário','Amizade','Parabéns','Gratidão'] },
  { id:'tulipa-rosa', name:'Tulipa Rosa', sci:'Tulipa gesneriana', emoji:'🌷', file:'tulipa_rosa.png',
    feelings:['Amor','Amizade'], meanings:['Carinho','Cuidado','Afeto'],
    colors:['Rosa'], category:'Afeto', origin:'Ásia Central', season:'Primavera',
    about:'A tulipa rosa fala de afeto gentil e cuidado cotidiano.',
    occasions:['Amizade','Aniversário','Gratidão','Parabéns'] },
  { id:'lavanda', name:'Lavanda', sci:'Lavandula angustifolia', emoji:'🪻', file:'lavanda.png',
    feelings:['Tranquilidade','Esperança'], meanings:['Tranquilidade','Equilíbrio','Paz'],
    colors:['Roxo','Lilás'], category:'Tranquilidade', origin:'Mediterrâneo', season:'Verão',
    about:'A lavanda acalma os sentidos. Seu perfume traz serenidade e sensação de lar.',
    occasions:['Condolências','Gratidão','Amizade','Dia dos Namorados'] },
  { id:'lirio-branco', name:'Lírio Branco', sci:'Lilium candidum', emoji:'🌸', file:'lirio_branco.png',
    feelings:['Esperança','Tranquilidade'], meanings:['Pureza','Inocência','Renovação'],
    colors:['Branco'], category:'Pureza', origin:'Europa / Ásia', season:'Primavera / Verão',
    about:'O lírio branco simboliza pureza e recomeços.',
    occasions:['Casamento','Condolências','Gratidão','Aniversário'] },
  { id:'peonia', name:'Peônia', sci:'Paeonia lactiflora', emoji:'🌺', file:'peonia.png',
    feelings:['Amor','Alegria'], meanings:['Prosperidade','Honra','Romance feliz'],
    colors:['Rosa','Branco'], category:'Prosperidade', origin:'Ásia', season:'Primavera',
    about:'A peônia é a rainha das flores. Representa abundância e bons presságios.',
    occasions:['Casamento','Parabéns','Aniversário','Dia dos Namorados'] },
  { id:'orquidea-roxa', name:'Orquídea Roxa', sci:'Phalaenopsis spp.', emoji:'💮', file:'orquidea_roxa.png',
    feelings:['Amor','Gratidão'], meanings:['Beleza','Amor','Refinamento'],
    colors:['Roxo'], category:'Admiração', origin:'Ásia / Oceania', season:'Ano inteiro',
    about:'A orquídea roxa é sofisticada e resistente — admiração profunda e amor paciente.',
    occasions:['Gratidão','Aniversário','Parabéns','Dia dos Namorados'] },
  { id:'margarida', name:'Margarida', sci:'Leucanthemum vulgare', emoji:'🌼', file:'margarida.png',
    feelings:['Amizade','Alegria'], meanings:['Inocência','Lealdade','Amizade'],
    colors:['Branco','Amarelo'], category:'Amizade', origin:'Europa', season:'Primavera / Verão',
    about:'Simples e sincera, a margarida é a flor das amizades verdadeiras.',
    occasions:['Amizade','Aniversário','Gratidão','Pedido de Desculpas'] },
  { id:'jasmim', name:'Jasmim', sci:'Jasminum officinale', emoji:'🤍', file:'jasmim.png',
    feelings:['Amor','Tranquilidade'], meanings:['Amor eterno','Espiritualidade','Doçura'],
    colors:['Branco'], category:'Amor', origin:'Ásia', season:'Primavera / Verão',
    about:'O jasmim exala um perfume doce que só se revela à noite.',
    occasions:['Casamento','Dia dos Namorados','Condolências','Gratidão'] },
  { id:'cravo-vermelho', name:'Cravo Vermelho', sci:'Dianthus caryophyllus', emoji:'🌺', file:'cravo_vermelho.png',
    feelings:['Coragem','Amor'], meanings:['Admiração','Coragem','Paixão'],
    colors:['Vermelho'], category:'Admiração', origin:'Mediterrâneo', season:'Ano inteiro',
    about:'O cravo vermelho é a flor da coragem e da admiração.',
    occasions:['Parabéns','Aniversário','Dia dos Namorados','Gratidão'] },
  { id:'hortensia-azul', name:'Hortênsia Azul', sci:'Hydrangea macrophylla', emoji:'💙', file:'hortensia_azul.png',
    feelings:['Gratidão','Tranquilidade'], meanings:['Gratidão','Abundância','Sinceridade'],
    colors:['Azul'], category:'Gratidão', origin:'Ásia / América', season:'Verão',
    about:'A hortênsia floresce em cachos generosos, simbolizando gratidão e abundância.',
    occasions:['Gratidão','Casamento','Amizade','Condolências'] },
  { id:'iris-roxa', name:'Íris Roxa', sci:'Iris germanica', emoji:'🪻', file:'iris_roxa.png',
    feelings:['Esperança','Coragem'], meanings:['Esperança','Sabedoria','Coragem'],
    colors:['Roxo'], category:'Esperança', origin:'Europa', season:'Primavera',
    about:'Na mitologia, a íris era a mensageira dos deuses.',
    occasions:['Pedido de Desculpas','Condolências','Parabéns','Gratidão'] },
  { id:'campanula', name:'Campânula', sci:'Campanula medium', emoji:'🔔', file:'campanula.png',
    feelings:['Tranquilidade','Esperança'], meanings:['Gratidão','Humildade','Constância'],
    colors:['Azul','Roxo'], category:'Gratidão', origin:'Europa', season:'Primavera / Verão',
    about:'A campânula balança suavemente ao vento, como sinos silenciosos.',
    occasions:['Gratidão','Amizade','Condolências','Aniversário'] },
  { id:'tulipa-roxa', name:'Tulipa Roxa', sci:'Tulipa gesneriana', emoji:'🪻', file:'tulipa_roxa.png',
    feelings:['Amor','Tranquilidade'], meanings:['Realeza','Admiração','Espiritualidade'],
    colors:['Roxo'], category:'Admiração', origin:'Ásia Central', season:'Primavera',
    about:'A tulipa roxa é a tulipa da realeza.',
    occasions:['Casamento','Aniversário','Dia dos Namorados','Gratidão'] },
  { id:'lotus-roxo', name:'Lótus Roxo', sci:'Nelumbo nucifera', emoji:'🪷', file:'lotus_roxo.png',
    feelings:['Esperança','Tranquilidade'], meanings:['Iluminação','Renascimento','Pureza espiritual'],
    colors:['Roxo','Rosa'], category:'Espiritualidade', origin:'Ásia', season:'Verão',
    about:'O lótus nasce do lodo e floresce limpo — símbolo de renascimento.',
    occasions:['Casamento','Condolências','Aniversário','Gratidão'] },
  { id:'narciso', name:'Narciso', sci:'Narcissus poeticus', emoji:'🌼', file:'narciso.png',
    feelings:['Alegria','Esperança'], meanings:['Renovação','Autoestima','Primavera'],
    colors:['Amarelo','Branco'], category:'Alegria', origin:'Europa', season:'Primavera',
    about:'O narciso anuncia a primavera. É a flor do recomeço e da autoestima.',
    occasions:['Aniversário','Parabéns','Amizade','Pedido de Desculpas'] },
  { id:'crocus', name:'Crocus', sci:'Crocus sativus', emoji:'🟣', file:'crocus.png',
    feelings:['Esperança','Alegria'], meanings:['Renascimento','Ousadia','Alegria'],
    colors:['Roxo','Lilás'], category:'Esperança', origin:'Mediterrâneo', season:'Primavera',
    about:'O crocus fura a neve para florescer — prova de que a beleza sempre volta.',
    occasions:['Aniversário','Parabéns','Gratidão','Recomeço'] },
  { id:'camelia-rosa', name:'Camélia Rosa', sci:'Camellia japonica', emoji:'🌺', file:'camelia_rosa.png',
    feelings:['Amor','Gratidão'], meanings:['Admiração','Perfeição','Devotamento'],
    colors:['Rosa'], category:'Amor', origin:'Ásia', season:'Inverno / Primavera',
    about:'A camélia floresce quando quase nada floresce.',
    occasions:['Dia dos Namorados','Casamento','Gratidão','Aniversário'] },
  { id:'camelia-vermelha', name:'Camélia Vermelha', sci:'Camellia japonica', emoji:'🌹', file:'camelia_vermelha.png',
    feelings:['Amor','Coragem'], meanings:['Amor ardente','Coragem','Reconhecimento'],
    colors:['Vermelho'], category:'Amor', origin:'Ásia', season:'Inverno / Primavera',
    about:'A camélia vermelha é a flor do amor que não teme o inverno.',
    occasions:['Dia dos Namorados','Parabéns','Casamento','Aniversário'] },
  { id:'lotus-azul', name:'Lótus Azul', sci:'Nymphaea caerulea', emoji:'🪷', file:'lotus_azul.png',
    feelings:['Tranquilidade','Esperança'], meanings:['Sabedoria','Renascimento','Paz interior'],
    colors:['Azul'], category:'Espiritualidade', origin:'África / Ásia', season:'Verão',
    about:'O lótus azul era sagrado no Egito antigo — símbolo de renascimento e sabedoria.',
    occasions:['Condolências','Casamento','Aniversário','Gratidão'] },
  { id:'papoula', name:'Papoula', sci:'Papaver rhoeas', emoji:'🌺', file:'papoula.png',
    feelings:['Saudade','Amor'], meanings:['Memória','Consolo','Sono eterno'],
    colors:['Vermelho'], category:'Memória', origin:'Europa', season:'Primavera / Verão',
    about:'A papoula é a flor da lembrança.',
    occasions:['Condolências','Aniversário','Dia dos Namorados','Amizade'] },
  { id:'miosotis', name:'Miosótis', sci:'Myosotis', emoji:'💙', file:'miosotis.png',
    feelings:['Saudade','Amizade'], meanings:['Lembrança','Amor verdadeiro','Fidelidade'],
    colors:['Azul'], category:'Memória', origin:'Europa', season:'Primavera',
    about:'"Não me esqueças" — é o que o miosótis diz em silêncio.',
    occasions:['Amizade','Dia dos Namorados','Condolências','Gratidão'] },
  { id:'lirio-estrela', name:'Lírio Estrela', sci:'Lilium orientalis', emoji:'🌸', file:'lirio_estrela.png',
    feelings:['Amor','Alegria'], meanings:['Ambição','Prosperidade','Pureza'],
    colors:['Rosa','Branco'], category:'Prosperidade', origin:'Ásia', season:'Verão',
    about:'O lírio-estrela abre suas pétalas como uma constelação.',
    occasions:['Casamento','Parabéns','Aniversário','Gratidão'] },
  { id:'centaurea', name:'Centáurea', sci:'Centaurea cyanus', emoji:'💠', file:'centaurea.png',
    feelings:['Esperança','Amizade'], meanings:['Delicadeza','Lealdade','Sinceridade'],
    colors:['Azul'], category:'Amizade', origin:'Europa', season:'Verão',
    about:'A centáurea cresce em campos de trigo — símbolo de lealdade simples.',
    occasions:['Amizade','Gratidão','Aniversário','Pedido de Desculpas'] },
  { id:'copo-de-leite', name:'Copo-de-leite', sci:'Zantedeschia aethiopica', emoji:'🤍', file:'copo_de_leite.png',
    feelings:['Esperança','Tranquilidade'], meanings:['Pureza','Inocência','Renascimento'],
    colors:['Branco'], category:'Pureza', origin:'África do Sul', season:'Primavera',
    about:'Flor elegante — símbolo de pureza e novos começos.',
    occasions:['Casamento','Condolências','Gratidão','Aniversário'] },
  { id:'zinia', name:'Zínia', sci:'Zinnia elegans', emoji:'🌺', file:'zinia.png',
    feelings:['Alegria','Amizade'], meanings:['Amizade eterna','Lembrança','Resistência'],
    colors:['Vermelho','Rosa'], category:'Amizade', origin:'América Central', season:'Verão',
    about:'A zínia dura semanas depois de cortada — flor da amizade que resiste ao tempo.',
    occasions:['Amizade','Aniversário','Gratidão','Parabéns'] },
  { id:'rosa-azul', name:'Rosa Azul', sci:'Rosa × hybrida', emoji:'🔷', file:'rosa_azul.png',
    feelings:['Amor','Esperança'], meanings:['Mistério','Impossível','Milagre'],
    colors:['Azul'], category:'Amor', origin:'Cultivada', season:'Ano inteiro',
    about:'A rosa azul não existe na natureza — representa o impossível que se torna real.',
    occasions:['Dia dos Namorados','Aniversário','Parabéns','Pedido de Desculpas'] },
  { id:'flor-de-cerejeira', name:'Flor de Cerejeira', sci:'Prunus serrulata', emoji:'🌸', file:'flor_de_cerejeira.png',
    feelings:['Amor','Saudade'], meanings:['Efêmero','Renovação','Beleza passageira'],
    colors:['Rosa'], category:'Memória', origin:'Japão', season:'Primavera',
    about:'O sakura floresce por poucos dias — celebra a beleza do que é breve.',
    occasions:['Aniversário','Amizade','Condolências','Dia dos Namorados'] },
  { id:'lilas', name:'Lilás', sci:'Syringa vulgaris', emoji:'💜', file:'lilas.png',
    feelings:['Amor','Alegria'], meanings:['Primeiro amor','Juventude','Confiança'],
    colors:['Lilás','Roxo'], category:'Amor', origin:'Europa / Ásia', season:'Primavera',
    about:'O lilás floresce em cachos que lembram a juventude.',
    occasions:['Dia dos Namorados','Gratidão','Aniversário','Amizade'] },
  { id:'hibisco', name:'Hibisco', sci:'Hibiscus rosa-sinensis', emoji:'🌺', file:'hibisco.png',
    feelings:['Amor','Alegria'], meanings:['Paixão','Beleza delicada','Glória'],
    colors:['Vermelho'], category:'Admiração', origin:'Ásia', season:'Verão',
    about:'O hibisco é tropical e intenso. Suas pétalas abertas representam glória.',
    occasions:['Dia dos Namorados','Parabéns','Aniversário','Amizade'] },
  { id:'violeta', name:'Violeta', sci:'Viola odorata', emoji:'💜', file:'violeta.png',
    feelings:['Amor','Tranquilidade'], meanings:['Modéstia','Fidelidade','Amor oculto'],
    colors:['Roxo','Lilás'], category:'Amor', origin:'Europa', season:'Primavera',
    about:'A violeta floresce baixinho, quase escondida.',
    occasions:['Dia dos Namorados','Amizade','Gratidão','Aniversário'] },
  { id:'lirio-laranja', name:'Lírio Laranja', sci:'Lilium bulbiferum', emoji:'🧡', file:'lirio_laranja.png',
    feelings:['Alegria','Coragem'], meanings:['Paixão','Energia','Confiança'],
    colors:['Laranja'], category:'Alegria', origin:'Europa', season:'Verão',
    about:'O lírio laranja é a chama do jardim.',
    occasions:['Parabéns','Aniversário','Amizade','Gratidão'] },
  { id:'primula', name:'Prímula', sci:'Primula', emoji:'🌺', file:'primula.png',
    feelings:['Amor','Alegria'], meanings:['Primeiro amor','Juventude','Esperança'],
    colors:['Rosa','Vermelho'], category:'Amor', origin:'Europa', season:'Primavera',
    about:'A prímula é a primeira flor da primavera.',
    occasions:['Aniversário','Dia dos Namorados','Gratidão','Amizade'] },
  { id:'cravo-amarelo', name:'Cravo-amarelo', sci:'Tagetes', emoji:'🌻', file:'cravo_amarelo.png',
    feelings:['Alegria','Saudade'], meanings:['Criatividade','Proteção','Lembrança'],
    colors:['Amarelo','Laranja'], category:'Alegria', origin:'México', season:'Verão / Outono',
    about:'Também chamado de marigold, é a flor das festas e das memórias.',
    occasions:['Condolências','Aniversário','Gratidão','Parabéns'] },
  { id:'lirio-negro', name:'Lírio Negro', sci:'Lilium "Black Beauty"', emoji:'🖤', file:'lirio_negro.png',
    feelings:['Amor','Saudade'], meanings:['Amor proibido','Mistério','Elegância'],
    colors:['Preto','Roxo'], category:'Memória', origin:'Cultivada', season:'Verão',
    about:'O lírio negro é um vinho profundo — amor que não se explica.',
    occasions:['Dia dos Namorados','Condolências','Aniversário','Pedido de Desculpas'] },
  { id:'cravo-rosa', name:'Cravo Rosa', sci:'Dianthus caryophyllus', emoji:'🌸', file:'cravo_rosa.png',
    feelings:['Gratidão','Amor'], meanings:['Gratidão materna','Memória','Carinho'],
    colors:['Rosa'], category:'Gratidão', origin:'Mediterrâneo', season:'Ano inteiro',
    about:'O cravo rosa é a flor do Dia das Mães.',
    occasions:['Gratidão','Condolências','Aniversário','Amizade'] },
  { id:'cosmos', name:'Cosmos', sci:'Cosmos bipinnatus', emoji:'🌼', file:'cosmos.png',
    feelings:['Alegria','Tranquilidade'], meanings:['Ordem','Harmonia','Beleza simples'],
    colors:['Rosa','Branco'], category:'Tranquilidade', origin:'México', season:'Verão / Outono',
    about:'O cosmos cresce em campo aberto, balançando com o vento.',
    occasions:['Amizade','Aniversário','Gratidão','Parabéns'] },
  { id:'magnolia', name:'Magnólia', sci:'Magnolia', emoji:'🤍', file:'magnolia.png',
    feelings:['Amor','Esperança'], meanings:['Dignidade','Pureza','Nobreza'],
    colors:['Branco','Rosa'], category:'Pureza', origin:'Ásia / América', season:'Primavera',
    about:'A magnólia é uma das flores mais antigas do mundo.',
    occasions:['Casamento','Aniversário','Condolências','Gratidão'] },
  { id:'anemona', name:'Anêmona', sci:'Anemone coronaria', emoji:'💜', file:'anemona.png',
    feelings:['Amor','Tranquilidade'], meanings:['Proteção','Antecipação','Sinceridade'],
    colors:['Roxo','Lilás'], category:'Admiração', origin:'Mediterrâneo', season:'Primavera',
    about:'Segundo a lenda, a anêmona nasceu das lágrimas de Afrodite.',
    occasions:['Amizade','Casamento','Gratidão','Aniversário'] },
  { id:'anemona-branca', name:'Anêmona Branca', sci:'Anemone coronaria', emoji:'🌸', file:'anemona_branca.png',
    feelings:['Esperança','Saudade'], meanings:['Sinceridade','Fragilidade','Antecipação'],
    colors:['Branco'], category:'Pureza', origin:'Mediterrâneo', season:'Primavera',
    about:'A anêmona branca é pura e sincera.',
    occasions:['Condolências','Aniversário','Amizade','Casamento'] },
  { id:'crisantemo', name:'Crisântemo', sci:'Chrysanthemum morifolium', emoji:'🏵️', file:'crisantemo.png',
    feelings:['Alegria','Esperança'], meanings:['Longevidade','Nobreza','Alegria'],
    colors:['Amarelo','Branco','Roxo'], category:'Prosperidade', origin:'Ásia', season:'Outono',
    about:'O crisântemo é a flor imperial do Japão.',
    occasions:['Aniversário','Parabéns','Gratidão','Condolências'] },
  { id:'dalia', name:'Dália', sci:'Dahlia pinnata', emoji:'💐', file:'dalia.png',
    feelings:['Alegria','Amor'], meanings:['Elegância','Criatividade','Dignidade'],
    colors:['Vermelho','Rosa','Roxo','Amarelo'], category:'Admiração', origin:'México', season:'Verão / Outono',
    about:'A dália é a flor nacional do México.',
    occasions:['Parabéns','Aniversário','Casamento','Gratidão'] },
  { id:'fresia', name:'Frésia', sci:'Freesia refracta', emoji:'🌿', file:'fresia.png',
    feelings:['Amizade','Alegria'], meanings:['Inocência','Amizade','Confiança'],
    colors:['Branco','Amarelo'], category:'Amizade', origin:'África do Sul', season:'Primavera',
    about:'A frésia tem um perfume doce e inconfundível.',
    occasions:['Amizade','Aniversário','Gratidão','Pedido de Desculpas'] },
  { id:'jacinto', name:'Jacinto', sci:'Hyacinthus orientalis', emoji:'🪴', file:'jacinto.png',
    feelings:['Amor','Tranquilidade'], meanings:['Constância','Devoção','Renovação'],
    colors:['Roxo','Rosa','Branco','Azul'], category:'Amor', origin:'Mediterrâneo', season:'Primavera',
    about:'Na mitologia grega, o jacinto nasceu do sangue de um jovem amado por Apolo.',
    occasions:['Dia dos Namorados','Aniversário','Gratidão','Casamento'] },
  { id:'boca-de-leao', name:'Boca-de-leão', sci:'Antirrhinum majus', emoji:'🌾', file:'boca_de_leao.png',
    feelings:['Coragem','Alegria'], meanings:['Força','Graça','Proteção'],
    colors:['Vermelho','Rosa','Amarelo','Laranja'], category:'Coragem', origin:'Mediterrâneo', season:'Verão',
    about:'A boca-de-leão abre suas pétalas como uma boca quando pressionada.',
    occasions:['Parabéns','Aniversário','Amizade','Gratidão'] },
  { id:'dente-de-leao', name:'Dente-de-leão', sci:'Taraxacum officinale', emoji:'🍀', file:'dente_de_leao.png',
    feelings:['Esperança','Alegria'], meanings:['Resiliência','Desejos','Liberdade'],
    colors:['Amarelo'], category:'Esperança', origin:'Europa', season:'Primavera',
    about:'O dente-de-leão transforma-se em sopro de vento.',
    occasions:['Aniversário','Amizade','Parabéns','Pedido de Desculpas'] },
  { id:'trevo', name:'Trevo', sci:'Trifolium repens', emoji:'☘️', file:'trevo.png',
    feelings:['Esperança','Amizade'], meanings:['Sorte','Fé','Proteção'],
    colors:['Branco'], category:'Esperança', origin:'Europa', season:'Primavera',
    about:'Diz a lenda que encontrar um trevo de quatro folhas traz sorte.',
    occasions:['Amizade','Parabéns','Aniversário','Gratidão'] },
  { id:'flor-de-laranjeira', name:'Flor de Laranjeira', sci:'Citrus sinensis', emoji:'🍊', file:'flor_de_laranjeira.png',
    feelings:['Amor','Esperança'], meanings:['Pureza','Fertilidade','Casamento'],
    colors:['Branco'], category:'Pureza', origin:'Ásia', season:'Primavera',
    about:'A flor de laranjeira é tradição em casamentos.',
    occasions:['Casamento','Dia dos Namorados','Gratidão','Aniversário'] },
  { id:'flor-de-maca', name:'Flor de Macieira', sci:'Malus domestica', emoji:'🍎', file:'flor_de_maca.png',
    feelings:['Amor','Esperança'], meanings:['Amor','Promessa','Renovação'],
    colors:['Rosa','Branco'], category:'Amor', origin:'Europa', season:'Primavera',
    about:'A flor de macieira anuncia a primavera e a promessa de frutos.',
    occasions:['Dia dos Namorados','Casamento','Aniversário','Gratidão'] },
  { id:'flor-de-pessegueiro', name:'Flor de Pessegueiro', sci:'Prunus persica', emoji:'🍑', file:'flor_de_pessegueiro.png',
    feelings:['Amor','Esperança'], meanings:['Longevidade','Romance','Imortalidade'],
    colors:['Rosa'], category:'Amor', origin:'Ásia', season:'Primavera',
    about:'Na China, a flor de pessegueiro é símbolo de longevidade e romance.',
    occasions:['Dia dos Namorados','Aniversário','Casamento','Gratidão'] },
  { id:'proteia', name:'Proteia', sci:'Protea cynaroides', emoji:'🌱', file:'proteia.png',
    feelings:['Coragem','Esperança'], meanings:['Transformação','Coragem','Diversidade'],
    colors:['Rosa','Vermelho'], category:'Coragem', origin:'África do Sul', season:'Ano inteiro',
    about:'A proteia é uma das flores mais antigas do planeta.',
    occasions:['Parabéns','Aniversário','Gratidão','Pedido de Desculpas'] },
  { id:'rosa-canina', name:'Rosa-canina', sci:'Rosa canina', emoji:'🥀', file:'rosa_canina.png',
    feelings:['Saudade','Amor'], meanings:['Simplicidade','Memória','Resiliência'],
    colors:['Rosa','Branco'], category:'Memória', origin:'Europa', season:'Primavera / Verão',
    about:'A rosa-canina é a rosa selvagem — simples, resistente e cheia de espinhos.',
    occasions:['Condolências','Dia dos Namorados','Aniversário','Amizade'] },
  { id:'flor-de-lis', name:'Flor-de-lis', sci:'Iris pseudacorus', emoji:'⚜️', file:'flor_de_lis.png',
    feelings:['Esperança','Coragem'], meanings:['Realeza','Sabedoria','Inspiração'],
    colors:['Amarelo','Roxo'], category:'Esperança', origin:'Europa', season:'Primavera / Verão',
    about:'A flor-de-lis é símbolo da realeza francesa e da sabedoria.',
    occasions:['Parabéns','Aniversário','Gratidão','Casamento'] },
  { id:'flor-de-cacto', name:'Flor de Cacto', sci:'Cereus jamacaru', emoji:'🌵', file:'flor_de_cacto.png',
    feelings:['Esperança','Coragem'], meanings:['Resiliência','Beleza rara','Força'],
    colors:['Branco','Rosa'], category:'Esperança', origin:'América', season:'Verão',
    about:'O cacto floresce no deserto, onde nada deveria florescer.',
    occasions:['Parabéns','Aniversário','Gratidão','Pedido de Desculpas'] },
  { id:'flor-de-bordo', name:'Flor de Bordo', sci:'Acer', emoji:'🍁', file:'flor_de_bordo.png',
    feelings:['Saudade','Esperança'], meanings:['Outono','Mudança','Memória'],
    colors:['Vermelho','Laranja'], category:'Memória', origin:'América do Norte / Ásia', season:'Outono',
    about:'A flor de bordo anuncia o outono — estação das despedidas.',
    occasions:['Condolências','Aniversário','Gratidão','Amizade'] },
  { id:'flor-de-outono', name:'Flor de Outono', sci:'Colchicum autumnale', emoji:'🍂', file:'flor_de_outono.png',
    feelings:['Saudade','Tranquilidade'], meanings:['Renascimento','Ciclos','Serenidade'],
    colors:['Rosa','Lilás'], category:'Tranquilidade', origin:'Europa', season:'Outono',
    about:'Também chamada de "dama nua", floresce sem folhas no outono.',
    occasions:['Condolências','Aniversário','Gratidão','Amizade'] },
  { id:'flor-de-palmeira', name:'Flor de Palmeira', sci:'Cocos nucifera', emoji:'🌴', file:'flor_de_palmeira.png',
    feelings:['Alegria','Esperança'], meanings:['Vitória','Tropicalidade','Fartura'],
    colors:['Amarelo','Branco'], category:'Prosperidade', origin:'Trópicos', season:'Ano inteiro',
    about:'A flor de palmeira é discreta, mas anuncia os frutos que virão.',
    occasions:['Parabéns','Aniversário','Gratidão','Amizade'] },
  { id:'flor-de-pinheiro', name:'Flor de Pinheiro', sci:'Pinus', emoji:'🌲', file:'flor_de_pinheiro.png',
    feelings:['Esperança','Tranquilidade'], meanings:['Eternidade','Resiliência','Paz'],
    colors:['Amarelo','Branco'], category:'Tranquilidade', origin:'Hemisfério Norte', season:'Primavera',
    about:'A flor de pinheiro é quase invisível, mas dá origem à árvore mais resistente.',
    occasions:['Condolências','Gratidão','Aniversário','Casamento'] },
  { id:'flor-de-bambu', name:'Flor de Bambu', sci:'Bambusa', emoji:'🎋', file:'flor_de_bambu.png',
    feelings:['Esperança','Amizade'], meanings:['Flexibilidade','Prosperidade','Paz'],
    colors:['Amarelo','Branco'], category:'Prosperidade', origin:'Ásia', season:'Ano inteiro',
    about:'A flor de bambu é raríssima — algumas espécies florescem só uma vez a cada 100 anos.',
    occasions:['Parabéns','Aniversário','Gratidão','Amizade'] },
  { id:'flor-de-jacaranda', name:'Flor de Jacarandá', sci:'Jacaranda mimosifolia', emoji:'🌳', file:'flor_de_jacaranda.png',
    feelings:['Tranquilidade','Esperança'], meanings:['Serenidade','Renovação','Beleza'],
    colors:['Roxo','Lilás'], category:'Tranquilidade', origin:'América do Sul', season:'Primavera',
    about:'Quando o jacarandá floresce, ruas inteiras ficam lilás.',
    occasions:['Aniversário','Gratidão','Casamento','Amizade'] }
];

/* Expansão automática */
(function expandFlowers(){
  const feelingMap = {
    'Renovação':     ['renov','recome','renasc','primavera','ciclo','novo come','amanhecer','muda'],
    'Prosperidade':  ['prosper','abundân','fartur','vitória','riqueza','colheita','conquista','fortuna','honra','nobreza'],
    'Admiração':     ['admira','respeito','enlevo','encanto','reverên','sofistica','nobreza','dignidade'],
    'Espiritualidade':['espiritual','ilumina','fé','alma','sagrad','eleva','ritual','eternidade','imortal'],
    'Pureza':        ['pureza','inocên','sinceridade','puro','castidade','fragilidade'],
    'Paixão':        ['paixão','desejo','ardente','fogo','intensidade','glória'],
    'Sorte':         ['sorte','fortuna','presságio','amuleto','bons augúrios','milagre'],
    'Resiliência':   ['resiliên','supera','resistên','perseveran','sobrevi','força interior','força','cacto','selvagem'],
    'Serenidade':    ['serenid','paz interior','calma','sereno','medita','tranquil','paz'],
    'Encanto':       ['encanto','fascín','magia','deslumbra','beleza rara','mistério','beleza']
  };
  FLOWERS.forEach(f => {
    const pool = [...f.feelings, ...f.meanings, f.category].join(' ').toLowerCase();
    for(const [feeling, keys] of Object.entries(feelingMap)){
      if(f.feelings.includes(feeling)) continue;
      if(keys.some(k => pool.includes(k))) f.feelings.push(feeling);
    }
  });

  const occasionMap = {
    'Dia das Mães':         ['mãe','materno','gratidão','afeto','carinho','família','amor eterno'],
    'Dia dos Pais':         ['pai','paterno','força','proteção','família','coragem'],
    'Formatura':            ['conquista','vitória','prosperidade','conhecimento','sabedoria','sucesso'],
    'Nascimento':           ['pureza','renovação','esperança','inocência','novo','alegria','fertilidade'],
    'Recomeço':             ['renovação','recomeço','esperança','primavera','novo ciclo','amanhecer','renascimento'],
    'Superação':            ['resiliência','coragem','força','superação','resistência','vitória'],
    'Despedida':            ['saudade','memória','lembrança','afeto','eternidade','despedida'],
    'Boas-vindas':          ['alegria','amizade','esperança','acolhimento','novo'],
    'Ano Novo':             ['renovação','esperança','prosperidade','alegria','ciclo','recomeço'],
    'Dia da Mulher':        ['admiração','coragem','força','encanto','beleza','pureza'],
    'Dia do Amigo':         ['amizade','alegria','gratidão','lealdade','confiança'],
    'Páscoa':               ['renovação','espiritualidade','esperança','renascimento','fé','recomeço'],
    'Natal':                ['amor','família','gratidão','alegria','união','esperança'],
    'Pedido de Casamento':  ['amor','paixão','romance','união','compromisso','amor eterno'],
    'Agradecimento':        ['gratidão','amizade','afeto','reconhecimento','carinho'],
    'Cerimônia Espiritual': ['espiritualidade','pureza','serenidade','fé','elevação','iluminação'],
    'Homenagem Empresarial':['admiração','prosperidade','conquista','vitória','sucesso','honra'],
    'Solidariedade':        ['amizade','afeto','gratidão','coragem','apoio','empatia']
  };
  FLOWERS.forEach(f => {
    const pool = [...f.feelings, ...f.meanings, f.category, ...f.occasions].join(' ').toLowerCase();
    for(const [occ, keys] of Object.entries(occasionMap)){
      if(f.occasions.includes(occ)) continue;
      if(keys.some(k => pool.includes(k))) f.occasions.push(occ);
    }
  });
})();

const SUGGESTIONS = [
  'Para você, com todo o meu carinho e gratidão. Obrigada por sempre estar ao meu lado.',
  'Para você, com amor.',
  'Gratidão eterna.',
  'Que a vida te traga flores.',
  'Você faz meus dias mais leves. Obrigado(a) por existir.'
];

const QUIZ = [
  { q:'O que te faz sorrir logo ao acordar?', options:[
      { t:'Uma mensagem de quem eu amo',       f:'Amor' },
      { t:'A luz do sol entrando pela janela', f:'Alegria' },
      { t:'O silêncio tranquilo da manhã',     f:'Tranquilidade' },
      { t:'Um novo plano para o dia',          f:'Esperança' } ] },
  { q:'Qual dessas cores mais combina com você?', options:[
      { t:'Vermelho intenso', f:'Amor' },
      { t:'Amarelo vibrante', f:'Alegria' },
      { t:'Verde suave',      f:'Amizade' },
      { t:'Lilás calmo',      f:'Tranquilidade' } ] },
  { q:'Qual sentimento mais representa você?', options:[
      { t:'Amor',          f:'Amor' },
      { t:'Alegria',       f:'Alegria' },
      { t:'Tranquilidade', f:'Tranquilidade' },
      { t:'Esperança',     f:'Esperança' } ] },
  { q:'O que você faria por um amigo?', options:[
      { t:'Qualquer coisa, sem pensar',  f:'Amizade' },
      { t:'Estaria ao lado em silêncio', f:'Tranquilidade' },
      { t:'Faria uma surpresa enorme',   f:'Alegria' },
      { t:'Daria forças para recomeçar', f:'Esperança' } ] },
  { q:'Qual lembrança você guarda com carinho?', options:[
      { t:'Um abraço apertado',          f:'Amor' },
      { t:'Uma risada compartilhada',    f:'Alegria' },
      { t:'Uma tarde sem pressa',        f:'Tranquilidade' },
      { t:'Uma conversa que mudou tudo', f:'Amizade' } ] },
  { q:'Que mensagem você gostaria de deixar?', options:[
      { t:'"Eu te amo mais do que consigo dizer."', f:'Amor' },
      { t:'"Obrigado(a) por existir."',             f:'Amizade' },
      { t:'"Vai dar tudo certo."',                  f:'Esperança' },
      { t:'"Respire. Você está bem."',              f:'Tranquilidade' } ] }
];

const FLAVOR_LINES = [
  '* O cheiro de flores preenche o ar.',
  '* Você sente a determinação encher seu peito.',
  '* As pétalas caem devagar, como se soubessem de algo.',
  '* Alguém, em algum lugar, sorri com a sua chegada.',
  '* Uma leve brisa faz as folhas sussurrarem.',
  '* A noite está tranquila. Perfeita para pensar em quem você ama.',
  '* Seu coração está cheio de flores.',
  '* Que sentimento será que mora em você agora?'
];

const ASSETS = [
  'assets/logo/floriografia_logo.png',
  'assets/fundos/fundo_inicio.png',
  'assets/fundos/fundo_criacao_buque.png',
  'assets/fundos/fundo_janela.png',
  'assets/personagens/personagens.png',
  'assets/personagens/personagem.png',
  'assets/personagens/flor_personagem.png',
  'assets/decoracao/fogueira.png'
];

/* --------------------------------------------------------------------------
   2. ESTADO
   -------------------------------------------------------------------------- */
const STORAGE_KEY = 'floriografia:v12';
const USERS_KEY   = 'floriografia:users';

const state = {
  route:'inicio',
  query:'',
  colors:new Set(),
  meanings:new Set(),
  occasion:'Todas',
  page:1,
  perPage:8,
  favorites:new Set(),
  bouquet:{},
  message:'',
  step:1,
  gardenTab:'todas',
  currentFlower:null,
  quizIndex:0,
  quizResult:null,
  quizScores:{},
  user:null,
  savedBouquets:[],
  history:[]
};

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      favorites:[...state.favorites],
      savedBouquets:state.savedBouquets,
      history:state.history,
      user:state.user
    }));
  }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.favorites)     state.favorites = new Set(d.favorites);
    if(d.savedBouquets) state.savedBouquets = d.savedBouquets;
    if(d.history)       state.history = d.history;
    if(d.user)          state.user = d.user;
  }catch(e){}
}

/* --------------------------------------------------------------------------
   3. AUTENTICAÇÃO
   -------------------------------------------------------------------------- */
function getUsers(){
  try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch(e){ return []; }
}
function persistUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function hashPassword(str){
  let h = 0x811c9dc5;
  for(let i = 0; i < str.length; i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return 'h_' + (h >>> 0).toString(36);
}
function registerUser(name, email, password){
  name  = (name  || '').trim();
  email = (email || '').trim().toLowerCase();
  if(name.length < 2)         return { ok:false, msg:'Nome muito curto.' };
  if(!/^\S+@\S+\.\S+$/.test(email)) return { ok:false, msg:'E-mail inválido.' };
  if((password || '').length < 4)   return { ok:false, msg:'Senha muito curta (mín. 4).' };

  const users = getUsers();
  if(users.some(u => u.email === email))
    return { ok:false, msg:'Este e-mail já está cadastrado.' };

  const user = { name, email, password: hashPassword(password), createdAt: Date.now() };
  users.push(user);
  persistUsers(users);
  return { ok:true, user: { name, email } };
}
function loginUser(email, password){
  email = (email || '').trim().toLowerCase();
  const user = getUsers().find(u => u.email === email);
  if(!user) return { ok:false, msg:'Usuário não encontrado.' };
  if(user.password !== hashPassword(password))
    return { ok:false, msg:'Senha incorreta.' };
  return { ok:true, user: { name:user.name, email:user.email } };
}
function logoutUser(){
  state.user = null;
  state.favorites = new Set();
  saveState();
}

/* --------------------------------------------------------------------------
   4. HELPERS
   -------------------------------------------------------------------------- */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const flowerById  = (id) => FLOWERS.find(f => f.id === id);
const feelingById = (id) => FEELINGS.find(f => f.id === id);

function flowerArt(flower, size = 60){
  return `
    <div class="flower-art" data-emoji="${flower.emoji}" style="--art-size:${size}px">
      <img src="assets/flores/${flower.file}" alt="${flower.name}" loading="lazy"
           onerror="this.closest('.flower-art').classList.add('fallback')">
    </div>`;
}

function showToast(message){
  const toast = $('#toast');
  const text  = $('#toastText');
  if(!toast || !text) return;
  text.textContent = message.replace(/^\*\s*/, '');
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function typewrite(el, text, opts = {}){
  if(!el) return;
  const speed = opts.speed || 28;
  const delay = opts.delay || 0;
  el.classList.add('typing');
  el.textContent = '';
  let i = 0, timer = null;
  const start = () => {
    const tick = () => {
      if(i >= text.length){
        el.classList.remove('typing');
        el.dispatchEvent(new CustomEvent('typed'));
        return;
      }
      const ch = text[i++];
      el.textContent += ch;
      let wait = speed;
      if('.!?'.includes(ch)) wait = speed * 9;
      else if(ch === ',')    wait = speed * 4;
      else if(ch === ' ')    wait = speed * 0.7;
      timer = setTimeout(tick, wait);
    };
    tick();
  };
  if(delay) setTimeout(start, delay); else start();
  const skip = () => {
    clearTimeout(timer);
    i = text.length;
    el.textContent = text;
    el.classList.remove('typing');
    el.removeEventListener('click', skip);
  };
  el.addEventListener('click', skip);
}

function typewriteAll(scope){
  $$('[data-typewrite]', scope).forEach(el => {
    const text = el.getAttribute('data-typewrite');
    if(!text || el.dataset.typed === text) return;
    el.dataset.typed = text;
    typewrite(el, text, { delay: Number(el.dataset.delay) || 0 });
  });
}

function popAt(el, text, color = '#d4af37'){
  if(!el) return;
  const rect = el.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'dmg-pop';
  pop.textContent = text;
  pop.style.left = (rect.left + rect.width / 2) + 'px';
  pop.style.top  = (rect.top  + rect.height / 2) + 'px';
  pop.style.color = color;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 900);
}

function randomFlavor(){ return FLAVOR_LINES[Math.floor(Math.random() * FLAVOR_LINES.length)]; }

function addHistory(text){
  state.history.unshift({ text, date:'Agora' });
  state.history = state.history.slice(0, 12);
  saveState();
}

/* --------------------------------------------------------------------------
   5. PRELOADER
   -------------------------------------------------------------------------- */
function runPreloader(){
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  const text = $('#preloaderText');
  if(!preloader) return Promise.resolve();

  const total = ASSETS.length;
  let loaded = 0, skipped = false;
  let resolvePromise;
  const promise = new Promise(r => resolvePromise = r);

  const finish = () => {
    if(skipped) return;
    skipped = true;
    preloader.classList.add('hidden');
    document.removeEventListener('keydown', keySkip);
    setTimeout(() => preloader.remove(), 500);
    resolvePromise();
  };
  const keySkip = (e) => { if(['z','Z','Escape','Enter'].includes(e.key)) finish(); };
  document.addEventListener('keydown', keySkip);
  preloader.addEventListener('click', finish);

  ASSETS.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      const pct = Math.round((loaded / total) * 100);
      if(bar)  bar.style.width = pct + '%';
      if(text) text.textContent = `* Carregando flores... ${pct}%`;
      if(loaded >= total) setTimeout(finish, 260);
    };
    img.src = src;
  });
  setTimeout(finish, 6000);
  return promise;
}

/* --------------------------------------------------------------------------
   6. ROTEADOR
   -------------------------------------------------------------------------- */
function go(route, params = {}){
  state.route = route;
  $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${route}`));
  $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route));
  $$('.bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.route === route));

  switch(route){
    case 'inicio':       renderHome(); break;
    case 'flores':       renderCatalog(); break;
    case 'flor':         renderFlowerDetail(params.id || state.currentFlower); break;
    case 'significados': renderMeanings(); break;
    case 'ocasioes':     renderOccasions(); break;
    case 'buque':        renderBouquet(); break;
    case 'jardim':       renderGarden(); break;
    case 'quiz':         renderQuiz(); break;
  }

  closeSidebar();
  closeMobileNav();

  const flavor = $('.view.active [data-flavor]');
  if(flavor) typewrite(flavor, randomFlavor());
  setTimeout(() => typewriteAll($('.view.active')), 60);
  resetSoulFocus();

  if(history.replaceState){
    history.replaceState(null, '', route === 'inicio' ? '#inicio' : `#${route}`);
  }
  window.scrollTo({ top:0, behavior:'smooth' });
}

/* --------------------------------------------------------------------------
   7. SOUL
   -------------------------------------------------------------------------- */
function soulTargets(){
  const view = $('.view.active');
  if(!view) return [];
  return $$('.ut-selectable', view).filter(el =>
    !el.disabled && el.offsetParent !== null && !el.classList.contains('no-soul'));
}
let soulIndex = 0;
function resetSoulFocus(){
  soulIndex = 0;
  $$('.soul-active').forEach(el => el.classList.remove('soul-active'));
}
function moveSoul(direction){
  const targets = soulTargets();
  if(!targets.length) return;
  const cur = targets.indexOf(document.activeElement);
  if(cur === -1) soulIndex = 0;
  else soulIndex = (cur + direction + targets.length) % targets.length;
  $$('.soul-active').forEach(el => el.classList.remove('soul-active'));
  const next = targets[soulIndex];
  next.classList.add('soul-active');
  next.focus({ preventScroll:false });
  next.animate(
    [{transform:'translateX(0)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],
    {duration:120, easing:'steps(2)'}
  );
}

document.addEventListener('keydown', (e) => {
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) && e.key !== 'Escape') return;
  if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); moveSoul(1); return; }
  if(e.key === 'ArrowUp'   || e.key === 'ArrowLeft'){  e.preventDefault(); moveSoul(-1); return; }
  if(e.key === 'z' || e.key === 'Z' || e.key === 'Enter'){
    const active = document.activeElement;
    if(active && active.classList.contains('ut-selectable')){ e.preventDefault(); active.click(); }
    return;
  }
  if(e.key === 'Escape'){
    closeSidebar();
    closeMobileNav();
  }
});

/* --------------------------------------------------------------------------
   8. SAVE POINT
   -------------------------------------------------------------------------- */
document.addEventListener('click', (e) => {
  const save = e.target.closest('[data-save]');
  if(!save) return;
  e.preventDefault();
  const star = $('.save-star', save) || save;
  star.animate([
    {transform:'scale(1) rotate(0deg)',     filter:'brightness(1)'},
    {transform:'scale(1.6) rotate(180deg)', filter:'brightness(2)'},
    {transform:'scale(1) rotate(360deg)',   filter:'brightness(1)'}
  ], {duration:600, easing:'steps(8)'});
  const messages = [
    '* (O cheiro de flores te enche de DETERMINAÇÃO.)',
    '* (Seu progresso foi salvo.)',
    '* (Você sente que nada pode te parar agora.)'
  ];
  popAt(save, '★', '#d4af37');
  showToast(messages[Math.floor(Math.random() * messages.length)].replace(/^\*\s*/, ''));
});

/* --------------------------------------------------------------------------
   9. HOME
   -------------------------------------------------------------------------- */
function renderHome(){
  const stats = {
    flowers:   FLOWERS.length,
    feelings:  FEELINGS.length,
    occasions: OCCASIONS.length
  };
  document.querySelectorAll('[data-stat]').forEach(el => {
    const key = el.dataset.stat;
    if(stats[key] != null) el.textContent = stats[key];
  });

  const row = $('#feelingsRow');
  if(!row) return;

  row.innerHTML = FEELINGS.map(f => `
    <button class="feeling-card ut-selectable" type="button" data-feeling="${f.id}" title="${f.desc}">
      <span class="ico-wrap" data-emoji="${f.emoji}" style="color:${f.color}; text-shadow:0 0 14px ${f.color};">${f.emoji}</span>
      <strong>${f.label}</strong>
      <small>${f.desc}</small>
    </button>
  `).join('');
}

/* --------------------------------------------------------------------------
   10. CATÁLOGO
   -------------------------------------------------------------------------- */
function matchesColor(flower){
  if(!state.colors.size) return true;
  return flower.colors.some(c => state.colors.has(c));
}
function matchesMeaning(flower){
  if(!state.meanings.size) return true;
  const pool = [...flower.feelings, ...flower.meanings, flower.category].join(' ').toLowerCase();
  return [...state.meanings].some(m => pool.includes(m.toLowerCase()));
}
function matchesOccasion(flower){
  if(state.occasion === 'Todas') return true;
  return flower.occasions.includes(state.occasion);
}
function getFilteredFlowers(){
  const q = state.query.trim().toLowerCase();
  return FLOWERS.filter(f => {
    if(q){
      const hay = `${f.name} ${f.sci} ${f.meanings.join(' ')} ${f.category} ${f.feelings.join(' ')}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return matchesColor(f) && matchesMeaning(f) && matchesOccasion(f);
  });
}

function renderCatalog(){
  renderColorFilters();
  renderMeaningFilters();
  renderOccasionSelect();
  renderCatalogResults();
}

function renderCatalogResults(){
  const list  = getFilteredFlowers();
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  state.page = Math.min(state.page, pages);
  const start = (state.page - 1) * state.perPage;
  const slice = list.slice(start, start + state.perPage);

  const grid = $('#flowerGrid');
  grid.innerHTML = slice.length
    ? slice.map(flowerCardHTML).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <span class="ico">✖</span>
         * Nenhuma flor encontrada.<br>Tente outros filtros.
       </div>`;

  const rc = $('#resultCount');
  if(rc) rc.textContent = `* ${total} flor${total === 1 ? '' : 'es'} encontrada${total === 1 ? '' : 's'}`;
  renderPagination(pages);
}

function flowerCardHTML(f){
  const isFav = state.favorites.has(f.id);
  return `
    <article class="flower-card ut-selectable" data-flower-open="${f.id}" tabindex="0"
             role="button" aria-label="Ver detalhes de ${f.name}">
      <button class="fav-btn ${isFav ? 'on' : ''}" type="button"
              data-fav="${f.id}" aria-label="Favoritar ${f.name}">♥</button>
      ${flowerArt(f, 56)}
      <h3>${f.name}</h3>
      <p class="flower-meanings">${f.meanings.join(' • ')}</p>
      <div class="flower-tags">
        ${f.feelings.slice(0, 2).map(x => `<span class="tag hot">${x}</span>`).join('')}
      </div>
    </article>`;
}

/* ⭐ COLOR CHIPS — só mostra cores que existem no catálogo ⭐ */
function renderColorFilters(){
  const wrap = $('#colorFilters');
  if(!wrap) return;

  // Conta quantas flores existem para cada cor
  const counts = {};
  COLORS.forEach(c => {
    counts[c.id] = FLOWERS.filter(f => f.colors.includes(c.id)).length;
  });

  // Só exibe cores que realmente têm flores
  const visibleColors = COLORS.filter(c => counts[c.id] > 0);

  // Se o usuário tinha selecionado uma cor inválida, remove
  const validIds = new Set(visibleColors.map(c => c.id));
  [...state.colors].forEach(id => {
    if(!validIds.has(id)) state.colors.delete(id);
  });

  wrap.innerHTML = visibleColors.map(c => {
    const on = state.colors.has(c.id);
    const n  = counts[c.id];
    return `
      <button class="color-chip ${on ? 'on' : ''}"
              type="button"
              data-color="${c.id}"
              aria-pressed="${on}"
              aria-label="${c.label} — ${n} flor${n === 1 ? '' : 'es'}"
              title="${c.label} (${n} flor${n === 1 ? '' : 'es'})"
              style="--chip-color:${c.hex}">
        <span>♥</span>
        <b>${n}</b>
      </button>`;
  }).join('');
}

function renderMeaningFilters(){
  const wrap = $('#meaningFilters');
  if(!wrap) return;
  wrap.innerHTML = MEANING_FILTERS.map(m => `
    <label class="check-item">
      <input type="checkbox" data-meaning="${m}" ${state.meanings.has(m) ? 'checked' : ''}>
      <i>♥</i> ${m}
    </label>
  `).join('');
}

function renderOccasionSelect(){
  const sel = $('#occasionFilter');
  if(!sel) return;
  sel.innerHTML = ['Todas', ...OCCASIONS.map(o => o.label)]
    .map(o => `<option value="${o}" ${state.occasion === o ? 'selected' : ''}>${o}</option>`)
    .join('');
}

function renderPagination(pages){
  const el = $('#pagination');
  if(!el) return;
  if(pages <= 1){ el.innerHTML = ''; return; }
  let html = `<button class="page-btn ut-selectable" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}>‹</button>`;
  for(let i = 1; i <= pages; i++){
    html += `<button class="page-btn ut-selectable ${i === state.page ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn ut-selectable" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}>›</button>`;
  el.innerHTML = html;
}

/* --------------------------------------------------------------------------
   11. DETALHE DA FLOR
   -------------------------------------------------------------------------- */
function renderFlowerDetail(id){
  const f = flowerById(id);
  if(!f){ go('flores'); return; }
  state.currentFlower = id;
  const isFav = state.favorites.has(id);

  const occasionChips = f.occasions.map(label => {
    const occ = OCCASIONS.find(o => o.label === label);
    return `<button type="button" class="ut-selectable" data-occasion-open="${label}">
      <span aria-hidden="true">${occ ? occ.emoji : '🌸'}</span>${label}
    </button>`;
  }).join('');

  $('#view-flor').innerHTML = `
    <nav class="breadcrumb" aria-label="Você está em">
      <button type="button" class="ut-selectable" data-route="flores">* Flores</button>
      <span>›</span>
      <span>${f.name}</span>
    </nav>

    <div class="detail-layout">
      <div class="detail-visual ut-box">${flowerArt(f, 170)}</div>

      <div class="detail-info">
        <div class="detail-header">
          <div>
            <h2>${f.name}</h2>
            <p class="sci">${f.sci}</p>
          </div>
          <button class="ut-btn ut-selectable ${isFav ? 'selected' : ''}" type="button" data-fav="${f.id}">
            <span class="heart">♥</span> ${isFav ? 'Favoritada' : 'Favoritar'}
          </button>
        </div>

        <section class="block">
          <h3>Significados</h3>
          <ul class="check-list">${f.meanings.map(m => `<li>${m}</li>`).join('')}</ul>
        </section>

        <section class="block">
          <h3>Cores</h3>
          <div class="color-dots">
            ${f.colors.map(c => {
              const col = COLORS.find(x => x.id === c);
              return `<span class="color-dot" style="background:${col ? col.hex : '#fff'}" title="${c}"></span>`;
            }).join('')}
          </div>
        </section>

        <section class="block">
          <h3>Informações</h3>
          <dl class="meta-grid">
            <div><dt>Categoria</dt><dd>${f.category}</dd></div>
            <div><dt>Origem</dt><dd>${f.origin}</dd></div>
            <div><dt>Época</dt><dd>${f.season}</dd></div>
            <div><dt>Sentimentos</dt><dd>${f.feelings.slice(0, 3).join(' · ')}</dd></div>
          </dl>
        </section>

        <section class="block">
          <h3>Sobre a flor</h3>
          <p class="about-text">${f.about}</p>
        </section>

        <section class="block">
          <h3>Ocasiões ideais</h3>
          <div class="occasion-mini">${occasionChips}</div>
        </section>

        <div class="detail-total">
          <span>* Total de flores no catálogo</span>
          <b>${FLOWERS.length}</b>
        </div>

        <div class="detail-actions">
          <button class="ut-btn ut-selectable" type="button" data-add-bouquet="${f.id}">
            <span class="heart">♥</span> ADICIONAR AO BUQUÊ
          </button>
          <button class="ut-btn ut-selectable" type="button" data-route="buque">
            IR PARA OFICINA →
          </button>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   12. SIGNIFICADOS
   -------------------------------------------------------------------------- */
function renderMeanings(){
  const wrap = $('#meaningGroups');
  if(!wrap) return;
  wrap.innerHTML = FEELINGS.map(feel => {
    const flowers = FLOWERS.filter(f => f.feelings.includes(feel.id));
    if(!flowers.length) return '';
    return `
      <section class="meaning-block ut-box">
        <header>
          <span class="ico" style="color:${feel.color}">${feel.emoji}</span>
          <div>
            <h2>${feel.label} <small style="color:#d4b8c8; font-family:var(--font-dialogue); font-size:15px;">(${flowers.length} flores)</small></h2>
            <p>${feel.desc}</p>
          </div>
        </header>
        <div class="mini-flower-row">
          ${flowers.map(f => `
            <button class="mini-flower ut-selectable" type="button" data-flower-open="${f.id}">
              ${flowerArt(f, 32)}
              <span>
                <strong>${f.name}</strong>
                <small>${f.meanings[0]}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </section>`;
  }).join('');
}

/* --------------------------------------------------------------------------
   13. OCASIÕES
   -------------------------------------------------------------------------- */
function renderOccasions(){
  const wrap = $('#occasionGrid');
  if(!wrap) return;
  wrap.innerHTML = OCCASIONS.map(o => {
    const count = FLOWERS.filter(f => f.occasions.includes(o.label)).length;
    return `
      <button class="occasion-card ut-selectable" type="button" data-occasion-open="${o.label}">
        <span class="ico">${o.emoji}</span>
        <h3>${o.label}</h3>
        <p>${o.desc}</p>
        <span class="count">${count} flor${count === 1 ? '' : 'es'} indicada${count === 1 ? '' : 's'}</span>
      </button>`;
  }).join('');
}

/* --------------------------------------------------------------------------
   14. BUQUÊ
   -------------------------------------------------------------------------- */
function bouquetItems(){
  return Object.entries(state.bouquet)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ flower: flowerById(id), qty }))
    .filter(item => item.flower);
}
function bouquetCount(){ return Object.values(state.bouquet).reduce((a, b) => a + b, 0); }
function bouquetFeelings(){
  const set = new Set();
  bouquetItems().forEach(({ flower }) => flower.feelings.forEach(f => set.add(f)));
  return [...set];
}

function bouquetVisualHTML(scale = 1){
  const items = bouquetItems();
  if(!items.length){
    return `<div class="bouquet-empty">* Nenhuma flor escolhida ainda.<br>Selecione ao lado para começar.</div>`;
  }

  const flat = [];
  items.forEach(({ flower, qty }) => {
    for(let i = 0; i < Math.min(qty, 12); i++) flat.push(flower);
  });

  const GOLDEN = 137.508;
  const total = flat.length;

  const spans = flat.map((f, i) => {
    const angle  = i * GOLDEN;
    const radius = (i === 0 ? 0 : 22 + 12 * Math.sqrt(i)) * scale;
    const z = 100 - i;
    const fs = Math.max(0.7, 1 - (i / (total * 1.8)));
    return `<span style="--a:${angle}deg; --r:${radius}px; --z:${z}; --s:${fs.toFixed(2)}"
                  title="${f.name}">${f.emoji}</span>`;
  }).join('');

  return `<div class="bouquet-visual">${spans}</div>`;
}

function renderStepper(){
  $$('#stepper li').forEach(li => {
    const n = Number(li.dataset.step);
    li.classList.toggle('active', n === state.step);
    li.classList.toggle('done',  n < state.step);
  });
}

function renderBouquet(){
  renderStepper();
  const body = $('#bouquetBody');
  if(state.step === 1) body.innerHTML = bouquetStepOne();
  if(state.step === 2) body.innerHTML = bouquetStepTwo();
  if(state.step === 3) body.innerHTML = bouquetStepThree();
  setTimeout(() => typewriteAll(body), 40);
}

function bouquetStepOne(){
  const rows = FLOWERS.map(f => {
    const qty = state.bouquet[f.id] || 0;
    return `
      <div class="picker-row">
        ${flowerArt(f, 28)}
        <div>
          <strong>${f.name}</strong>
          <small>${f.meanings[0]}</small>
        </div>
        <div class="qty">
          <button type="button" class="ut-selectable" data-qty="-1" data-id="${f.id}">−</button>
          <span>${qty}</span>
          <button type="button" class="ut-selectable" data-qty="1" data-id="${f.id}">＋</button>
        </div>
      </div>`;
  }).join('');

  const feelings = bouquetFeelings();

  return `
    <div class="bouquet-grid">
      <section class="builder-panel ut-box">
        <h3>Escolha as flores</h3>
        <div class="flower-picker">${rows}</div>
      </section>

      <section class="builder-panel ut-box bouquet-visual-wrap">
        <h3>Seu buquê</h3>
        ${bouquetVisualHTML(1)}
        <p class="bouquet-hint">* ${bouquetCount()} flor${bouquetCount() === 1 ? '' : 'es'} no buquê</p>
      </section>

      <section class="builder-panel ut-box">
        <h3>Significados do buquê</h3>
        <div class="tag-row">
          ${feelings.length
            ? feelings.map(f => `<span class="tag hot">${f}</span>`).join('')
            : '<span class="tag">—</span>'}
        </div>

        <div class="bouquet-total">
          <span>* Total de flores</span>
          <b>${bouquetCount()}</b>
        </div>

        <div class="builder-actions">
          <button class="ut-btn ut-selectable" type="button" id="clearBouquet">
            <span class="heart">♥</span> Limpar
          </button>
          <button class="ut-btn ut-selectable" type="button" id="nextStep"
                  ${bouquetCount() ? '' : 'disabled style="opacity:.4"'}>
            PRÓXIMO →
          </button>
        </div>
      </section>
    </div>`;
}

function bouquetStepTwo(){
  const len = (state.message || '').length;
  return `
    <div class="message-layout">
      <section class="builder-panel ut-box">
        <h3>Qual mensagem você deseja transmitir?</h3>
        <textarea class="message-area" id="bouquetMessage" maxlength="180"
          placeholder="Para você, com todo o meu carinho e gratidão..."
        >${state.message}</textarea>
        <div class="counter"><span id="msgCount">${len}</span> / 180</div>
      </section>

      <section class="builder-panel ut-box">
        <h3>Sugestões</h3>
        <div class="suggestion-list">
          ${SUGGESTIONS.map(s => `
            <button class="suggestion ut-selectable" type="button" data-suggestion="${s.replace(/"/g,'&quot;')}">
              * ${s}
            </button>`).join('')}
        </div>
      </section>
    </div>

    <div class="builder-actions">
      <button class="ut-btn ut-selectable" type="button" data-step-go="1">← VOLTAR</button>
      <button class="ut-btn ut-selectable" type="button" data-step-go="3">PRÓXIMO →</button>
    </div>`;
}

function bouquetStepThree(){
  const items = bouquetItems();
  const feelings = bouquetFeelings();

  const list = items.length
    ? items.map(({ flower, qty }) => `<span class="tag hot">${flower.name} ×${qty}</span>`).join('')
    : '<span class="tag">—</span>';

  return `
    <div class="summary-layout">
      <section class="summary-card ut-box">
        <h3>Seu buquê</h3>
        ${bouquetVisualHTML(1)}
        <div class="tag-row" style="justify-content:center;margin-top:14px">${list}</div>
      </section>

      <section class="summary-card ut-box">
        <h3>Resumo</h3>
        <div class="tag-row" style="margin-bottom:16px">
          ${feelings.length ? feelings.map(f => `<span class="tag hot">${f}</span>`).join('') : ''}
        </div>

        <div class="summary-message">${state.message || '* Sem mensagem escrita.'}</div>

        <div class="bouquet-total">
          <span>* Total de flores</span>
          <b>${bouquetCount()}</b>
        </div>

        <div class="builder-actions">
          <button class="ut-btn ut-selectable" type="button" data-step-go="2">← VOLTAR</button>
          <button class="ut-btn ut-selectable" type="button" id="saveBouquet">
            <span class="heart">♥</span> SALVAR
          </button>
        </div>
      </section>
    </div>`;
}

function saveBouquet(){
  if(!bouquetCount()){ showToast('Escolha ao menos uma flor'); return; }
  const date = new Date().toLocaleDateString('pt-BR');
  state.savedBouquets.unshift({
    id:'b' + Date.now(),
    flowers:{ ...state.bouquet },
    message: state.message || 'Sem mensagem.',
    date
  });
  addHistory('Novo buquê criado com ' + bouquetCount() + ' flores');
  saveState();
  popAt($('#saveBouquet') || document.body, '♥♥', '#c9585a');
  showToast('Buquê salvo no seu jardim ♥');
  state.bouquet = {};
  state.message = '';
  state.step = 1;
  setTimeout(() => go('jardim'), 500);
}

/* --------------------------------------------------------------------------
   15. JARDIM
   -------------------------------------------------------------------------- */
function renderGarden(){
  renderStats();
  renderGardenTabs();
  renderGardenBody();
  const greeting = $('#gardenGreeting');
  if(greeting){
    const lines = [
      '* Suas flores favoritas moram aqui.',
      '* Cada buquê guardado é uma memória viva.',
      '* Você regou bem o seu jardim.'
    ];
    typewrite(greeting, lines[Math.floor(Math.random() * lines.length)]);
  }
}

function renderStats(){
  const favCount  = state.favorites.size;
  const bouqCount = state.savedBouquets.length;
  const msgCount  = state.savedBouquets.filter(b => b.message && b.message !== 'Sem mensagem.').length;
  $('#statsRow').innerHTML = `
    <div class="stat-card">
      <span class="ico">♥</span>
      <div><b>${favCount}</b><small>* flores favoritas</small></div>
    </div>
    <div class="stat-card">
      <span class="ico">💐</span>
      <div><b>${bouqCount}</b><small>* buquês criados</small></div>
    </div>
    <div class="stat-card">
      <span class="ico">✉️</span>
      <div><b>${msgCount}</b><small>* mensagens salvas</small></div>
    </div>`;
}

function renderGardenTabs(){
  const tabs = [
    { id:'todas',     label:'* Meu Jardim' },
    { id:'favoritos', label:'* Favoritos' },
    { id:'buques',    label:'* Meus Buquês' },
    { id:'historico', label:'* Histórico' }
  ];
  $('#gardenTabs').innerHTML = tabs.map(t => `
    <button type="button" class="ut-selectable ${state.gardenTab === t.id ? 'active' : ''}"
            data-garden-tab="${t.id}">${t.label}</button>
  `).join('');
}

function renderGardenBody(){
  const body = $('#gardenBody');
  if(state.gardenTab === 'buques'){
    body.innerHTML = state.savedBouquets.length
      ? `<div class="bouquet-cards">${state.savedBouquets.map(bouquetCardHTML).join('')}</div>`
      : emptyState('💐', '* Você ainda não criou nenhum buquê.');
    return;
  }
  if(state.gardenTab === 'historico'){
    body.innerHTML = state.history.length
      ? `<div class="bouquet-cards">
          ${state.history.map(h => `
            <div class="bouquet-card">
              <p class="ut-dialogue" style="font-size:20px">${h.text}</p>
              <time>${h.date}</time>
            </div>`).join('')}
        </div>`
      : emptyState('🕘', '* Sem histórico por enquanto.');
    return;
  }
  const list = state.gardenTab === 'favoritos'
    ? FLOWERS.filter(f => state.favorites.has(f.id))
    : FLOWERS.slice(0, 12);

  body.innerHTML = list.length
    ? `<div class="garden-grid">
        ${list.map(f => `
          <button class="garden-item ut-selectable" type="button" data-flower-open="${f.id}">
            ${flowerArt(f, 56)}
            <strong>${f.name}</strong>
            <small>${f.meanings[0]}</small>
          </button>`).join('')}
      </div>`
    : emptyState('🌱', '* Nenhuma flor aqui ainda. Explore o catálogo!');
}

function bouquetCardHTML(b){
  const items = Object.entries(b.flowers || {})
    .map(([id, qty]) => ({ flower: flowerById(id), qty }))
    .filter(x => x.flower);

  const flat = [];
  items.forEach(({ flower, qty }) => {
    for(let i = 0; i < Math.min(qty, 8); i++) flat.push(flower);
  });

  const GOLDEN = 137.508;
  const spans = flat.map((f, i) => {
    const angle  = i * GOLDEN;
    const radius = (i === 0 ? 0 : 20 + 10 * Math.sqrt(i)) * 0.75;
    const z = 100 - i;
    const fs = Math.max(0.65, 1 - (i / (flat.length * 1.6)));
    return `<span style="--a:${angle}deg; --r:${radius}px; --z:${z}; --s:${fs.toFixed(2)}"
                  title="${f.name}">${f.emoji}</span>`;
  }).join('');

  return `
    <article class="bouquet-card">
      <div class="bouquet-visual">${spans}</div>
      <blockquote>${b.message}</blockquote>
      <time>${b.date}</time>
    </article>`;
}

function emptyState(ico, text){
  return `<div class="empty-state"><span class="ico">${ico}</span>${text}</div>`;
}

/* --------------------------------------------------------------------------
   16. QUIZ
   -------------------------------------------------------------------------- */
function renderQuiz(){
  const wrap = $('#quizWrap');
  if(state.quizResult){
    const feel = feelingById(state.quizResult) || FEELINGS[0];
    const flower = FLOWERS.find(f => f.feelings.includes(feel.id)) || FLOWERS[0];
    wrap.innerHTML = `
      <div class="quiz-result">
        ${flowerArt(flower, 96)}
        <h2>RESULTADO: ${feel.label} ${feel.emoji}</h2>
        <p>${feel.desc}<br>A flor que combina com você é a <strong style="color:#d4af37">${flower.name}</strong>.</p>
        <button class="ut-btn ut-selectable" type="button" data-flower-open="${flower.id}">
          <span class="heart">♥</span> VER ESSA FLOR
        </button>
        <button class="ut-btn ut-selectable" type="button" id="restartQuiz" style="margin-top:12px">
          REFAZER
        </button>
      </div>`;
    return;
  }

  const q = QUIZ[state.quizIndex];
  const pct = (state.quizIndex / QUIZ.length) * 100;

  wrap.innerHTML = `
    <div class="quiz-progress">
      <span>* Pergunta ${state.quizIndex + 1} de ${QUIZ.length}</span>
      <div class="quiz-bar"><i style="width:${pct}%"></i></div>
    </div>
    <h2 class="quiz-question">${q.q}</h2>
    <div class="quiz-options">
      ${q.options.map(o => `
        <button class="quiz-option ut-selectable" type="button" data-quiz="${o.f}">${o.t}</button>
      `).join('')}
    </div>`;
}

function answerQuiz(feeling){
  state.quizScores[feeling] = (state.quizScores[feeling] || 0) + 1;
  if(state.quizIndex < QUIZ.length - 1){
    state.quizIndex++;
    renderQuiz();
    resetSoulFocus();
    return;
  }
  const winner = Object.entries(state.quizScores).sort((a, b) => b[1] - a[1])[0][0];
  state.quizResult = winner;
  addHistory('Quiz floral concluído — resultado: ' + winner);
  saveState();
  renderQuiz();
  showToast('Quiz concluído ✦');
}

/* --------------------------------------------------------------------------
   17. FAVORITOS
   -------------------------------------------------------------------------- */
function toggleFavorite(id){
  const f = flowerById(id);
  if(!f) return;
  const btn = $(`[data-fav="${id}"]`);
  if(state.favorites.has(id)){
    state.favorites.delete(id);
    showToast(`${f.name} removida dos favoritos`);
  }else{
    state.favorites.add(id);
    showToast(`${f.name} adicionada aos favoritos`);
    addHistory(`Você favoritou ${f.name}`);
    if(btn) popAt(btn, '♥', '#c9585a');
  }
  saveState();
  $$(`[data-fav="${id}"]`).forEach(b => {
    if(b.classList.contains('fav-btn')) b.classList.toggle('on', state.favorites.has(id));
  });
  if(state.route === 'flor') renderFlowerDetail(id);
}

/* --------------------------------------------------------------------------
   18. SIDEBAR / MOBILE
   -------------------------------------------------------------------------- */
const sidebar = $('#sidebar');
const sidebarBackdrop = $('#sidebarBackdrop');
function openSidebar(){ sidebar.hidden = false; sidebarBackdrop.hidden = false; }
function closeSidebar(){ sidebar.hidden = true; sidebarBackdrop.hidden = true; }
function closeMobileNav(){
  const nav = $('#mobileNav');
  const btn = $('#menuBtn');
  if(nav) nav.classList.remove('open');
  if(btn) btn.setAttribute('aria-expanded', 'false');
}

/* --------------------------------------------------------------------------
   19. LOGIN UI
   -------------------------------------------------------------------------- */
function updateLoginUI(){
  const enterBtn  = $('#enterBtn');
  const avatarBtn = $('#avatarBtn');
  const userName  = $('#userName');
  const userLevel = $('#userLevel');

  if(state.user){
    if(enterBtn)  enterBtn.hidden = true;
    if(avatarBtn) avatarBtn.hidden = false;
    if(userName)  userName.textContent = state.user.name.toUpperCase();
    if(userLevel) userLevel.textContent = '* LV 5 · Jardineira';
  }else{
    if(enterBtn)  enterBtn.hidden = false;
    if(avatarBtn) avatarBtn.hidden = true;
    if(userName)  userName.textContent = 'VISITANTE';
    if(userLevel) userLevel.textContent = '* LV 1 · Visitante';
  }
}

/* --------------------------------------------------------------------------
   20. PORTAL — Grimório
   -------------------------------------------------------------------------- */
function setupPortal(){
  const grimoire = $('#grimoire');
  const portal   = $('#portal');
  if(!grimoire || !portal) return;

  portal.classList.remove('closing');
  grimoire.classList.remove('open');

  const openBtn = $('#grimoireOpenBtn');
  if(openBtn && !openBtn.dataset.bound){
    openBtn.dataset.bound = '1';
    openBtn.addEventListener('click', () => {
      grimoire.classList.add('open');
      setTimeout(() => {
        const first = $('#portalLoginEmail');
        if(first) first.focus();
      }, 1100);
    });
  }

  $$('[data-portal-tab]').forEach(tab => {
    if(tab.dataset.bound) return;
    tab.dataset.bound = '1';
    tab.addEventListener('click', () => {
      const which = tab.dataset.portalTab;
      $$('.page-tab').forEach(b => b.classList.toggle('active', b.dataset.portalTab === which));
      $$('.page-panel').forEach(p => p.hidden = p.dataset.portalPanel !== which);
      const lm = $('#portalLoginMsg');    if(lm) lm.textContent = '';
      const rm = $('#portalRegisterMsg'); if(rm) rm.textContent = '';
    });
  });

  const loginBtn = $('#portalDoLogin');
  if(loginBtn && !loginBtn.dataset.bound){
    loginBtn.dataset.bound = '1';
    loginBtn.addEventListener('click', () => {
      const email = $('#portalLoginEmail').value;
      const pass  = $('#portalLoginPass').value;
      const msg   = $('#portalLoginMsg');
      const res = loginUser(email, pass);
      if(!res.ok){ setPortalMsg(msg, res.msg, false); return; }
      state.user = res.user;
      updateLoginUI();
      saveState();
      setPortalMsg(msg, '', false);
      enterGarden(`Bem-vindo(a) de volta, ${state.user.name} ♥`);
    });
  }

  const regBtn = $('#portalDoRegister');
  if(regBtn && !regBtn.dataset.bound){
    regBtn.dataset.bound = '1';
    regBtn.addEventListener('click', () => {
      const name  = $('#portalRegName').value;
      const email = $('#portalRegEmail').value;
      const pass  = $('#portalRegPass').value;
      const pass2 = $('#portalRegPass2').value;
      const msg   = $('#portalRegisterMsg');
      if(pass !== pass2){ setPortalMsg(msg, 'As senhas não coincidem.', false); return; }
      const res = registerUser(name, email, pass);
      if(!res.ok){ setPortalMsg(msg, res.msg, false); return; }
      state.user = res.user;
      updateLoginUI();
      saveState();
      setPortalMsg(msg, '', false);
      enterGarden(`Conta criada. Bem-vindo(a), ${state.user.name} ♥`);
    });
  }

  ['portalLoginEmail','portalLoginPass','portalRegName','portalRegEmail','portalRegPass','portalRegPass2']
    .forEach(id => {
      const el = document.getElementById(id);
      if(!el || el.dataset.bound) return;
      el.dataset.bound = '1';
      el.addEventListener('keydown', e => {
        if(e.key === 'Enter'){
          e.preventDefault();
          const isLogin = id.startsWith('portalLogin');
          const btn = isLogin ? $('#portalDoLogin') : $('#portalDoRegister');
          if(btn) btn.click();
        }
      });
    });
}

function setPortalMsg(el, msg, ok){
  if(!el) return;
  el.textContent = msg ? '✦ ' + msg : '';
  el.classList.toggle('err', !ok);
  el.classList.toggle('ok', !!ok);
}

function enterGarden(toastMsg){
  const portal   = $('#portal');
  const grimoire = $('#grimoire');

  if(!portal || !grimoire){
    document.body.classList.add('entered');
    if(toastMsg) showToast(toastMsg);
    return;
  }

  grimoire.classList.remove('open');
  setTimeout(() => portal.classList.add('closing'), 800);

  setTimeout(() => {
    document.body.classList.add('entered');
    if(toastMsg) showToast(toastMsg);
    window.scrollTo({ top:0, behavior:'auto' });
    renderHome();
  }, 1300);
}

/* --------------------------------------------------------------------------
   21. EVENTOS GLOBAIS
   -------------------------------------------------------------------------- */
document.addEventListener('click', (event) => {
  const t = event.target;

  const favBtn = t.closest('[data-fav]');
  if(favBtn){
    event.preventDefault(); event.stopPropagation();
    toggleFavorite(favBtn.dataset.fav);
    return;
  }

  const flowerOpen = t.closest('[data-flower-open]');
  if(flowerOpen){ event.preventDefault(); go('flor', { id: flowerOpen.dataset.flowerOpen }); return; }

  const routeEl = t.closest('[data-route]');
  if(routeEl){ event.preventDefault(); go(routeEl.dataset.route); return; }

  /* ⭐ COR — com feedback visual e toast ⭐ */
  const colorChip = t.closest('[data-color]');
  if(colorChip){
    const c = colorChip.dataset.color;
    const wasOn = state.colors.has(c);
    wasOn ? state.colors.delete(c) : state.colors.add(c);
    state.page = 1;

    const chipColor = colorChip.style.getPropertyValue('--chip-color') || '#d4af37';
    popAt(colorChip, wasOn ? '−' : '+', wasOn ? '#8b6b8b' : chipColor);

    const total = getFilteredFlowers().length;
    const corLabel = (COLORS.find(x => x.id === c) || {}).label || c;
    showToast(wasOn
      ? `${corLabel} removida — ${total} flor${total === 1 ? '' : 'es'} no filtro`
      : `${corLabel} — ${total} flor${total === 1 ? '' : 'es'} encontrada${total === 1 ? '' : 's'}`);

    renderColorFilters();
    renderCatalogResults();

    if(window.innerWidth <= 900){
      const grid = $('#flowerGrid');
      if(grid) grid.scrollIntoView({ behavior:'smooth', block:'start' });
    }
    return;
  }

  const pageBtn = t.closest('[data-page]');
  if(pageBtn && !pageBtn.disabled){
    state.page = Number(pageBtn.dataset.page);
    renderCatalogResults();
    window.scrollTo({ top:0, behavior:'smooth' });
    return;
  }

  const feelingCard = t.closest('[data-feeling]');
  if(feelingCard){
    const feelingId = feelingCard.dataset.feeling;
    state.meanings.clear();
    state.meanings.add(feelingId);
    state.page = 1;
    $$('.feeling-card').forEach(c => c.classList.remove('active'));
    feelingCard.classList.add('active');
    const f = feelingById(feelingId);
    popAt(feelingCard, '♥', f.color);
    showToast(`Mostrando flores de ${f.label}...`);
    setTimeout(() => go('flores'), 400);
    return;
  }

  const addBtn = t.closest('[data-add-bouquet]');
  if(addBtn){
    const id = addBtn.dataset.addBouquet;
    state.bouquet[id] = (state.bouquet[id] || 0) + 1;
    popAt(addBtn, '+1', '#d4af37');
    showToast(`${flowerById(id).name} adicionada ao buquê`);
    return;
  }

  const qtyBtn = t.closest('[data-qty]');
  if(qtyBtn){
    const id = qtyBtn.dataset.id;
    const delta = Number(qtyBtn.dataset.qty);
    state.bouquet[id] = Math.max(0, (state.bouquet[id] || 0) + delta);
    if(!state.bouquet[id]) delete state.bouquet[id];
    if(delta > 0) popAt(qtyBtn, '+1', '#d4af37');
    renderBouquet();
    return;
  }

  const stepGo = t.closest('[data-step-go]');
  if(stepGo){
    state.step = Number(stepGo.dataset.stepGo);
    renderBouquet();
    window.scrollTo({ top:0, behavior:'smooth' });
    return;
  }

  const suggestion = t.closest('[data-suggestion]');
  if(suggestion){
    state.message = suggestion.dataset.suggestion;
    renderBouquet();
    return;
  }

  /* ⭐ ABAS DO JARDIM — aceita os dois atributos ⭐ */
  const gardenTab = t.closest('[data-garden-tab], [data-jardim-tab]');
  if(gardenTab){
    const tabId = gardenTab.dataset.gardenTab || gardenTab.dataset.jardimTab;
    if(tabId){
      state.gardenTab = tabId;
      closeSidebar();
      if(state.route !== 'jardim') go('jardim');
      else renderGarden();
      return;
    }
  }

  const occOpen = t.closest('[data-occasion-open]');
  if(occOpen){
    state.occasion = occOpen.dataset.occasionOpen;
    state.page = 1;
    go('flores');
    return;
  }

  const quizAnswer = t.closest('[data-quiz]');
  if(quizAnswer){ answerQuiz(quizAnswer.dataset.quiz); return; }

  if(t.closest('[data-sidebar]')){ openSidebar(); return; }
  if(t.closest('#menuBtn')){
    const nav = $('#mobileNav');
    const open = nav.classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
    return;
  }

  if(t.closest('#sidebarConfig')){ showToast('Configurações em breve'); return; }
  if(t.closest('#sidebarLogout')){
    logoutUser();
    updateLoginUI();
    closeSidebar();
    document.body.classList.remove('entered');
    showToast('Você saiu do jardim');
    setupPortal();
    return;
  }
});

document.addEventListener('input', (event) => {
  const t = event.target;
  if(t.id === 'flowerSearch'){
    state.query = t.value;
    state.page = 1;
    renderCatalogResults();
  }
  if(t.id === 'bouquetMessage'){
    state.message = t.value;
    const counter = $('#msgCount');
    if(counter) counter.textContent = t.value.length;
  }
});

document.addEventListener('change', (event) => {
  const t = event.target;
  if(t.matches('[data-meaning]')){
    const m = t.dataset.meaning;
    t.checked ? state.meanings.add(m) : state.meanings.delete(m);
    state.page = 1;
    renderCatalogResults();
  }
  if(t.id === 'occasionFilter'){
    state.occasion = t.value;
    state.page = 1;
    renderCatalogResults();
  }
});

document.addEventListener('click', (event) => {
  const t = event.target;

  if(t.closest('#clearFilters')){
    state.query = '';
    state.colors.clear();
    state.meanings.clear();
    state.occasion = 'Todas';
    state.page = 1;
    const search = $('#flowerSearch');
    if(search) search.value = '';
    renderCatalog();
    showToast('Filtros limpos');
    return;
  }
  if(t.closest('#clearBouquet')){
    state.bouquet = {};
    renderBouquet();
    showToast('Buquê limpo');
    return;
  }
  if(t.closest('#nextStep')){
    if(!bouquetCount()){ showToast('Escolha ao menos uma flor'); return; }
    state.step = 2;
    renderBouquet();
    window.scrollTo({ top:0, behavior:'smooth' });
    return;
  }
  if(t.closest('#saveBouquet')){ saveBouquet(); return; }
  if(t.closest('#restartQuiz')){
    state.quizIndex = 0;
    state.quizResult = null;
    state.quizScores = {};
    renderQuiz();
    return;
  }
  if(t.closest('#avatarBtn')){ openSidebar(); return; }
});

if(sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);
$$('#mobileNav a').forEach(a => a.addEventListener('click', closeMobileNav));

document.addEventListener('focusin', (e) => {
  if(!e.target.classList.contains('ut-selectable')) return;
  $$('.soul-active').forEach(el => { if(el !== e.target) el.classList.remove('soul-active'); });
  e.target.classList.add('soul-active');
});

/* --------------------------------------------------------------------------
   22. INIT
   -------------------------------------------------------------------------- */
async function init(){
  loadState();
  updateLoginUI();

  if(state.user){
    document.body.classList.add('entered');
  }else{
    document.body.classList.remove('entered');
    setupPortal();
  }

  if(!state.savedBouquets.length){
    state.savedBouquets = [
      { id:'b1', flowers:{'rosa-vermelha':2,'girassol':1,'lavanda':1}, message:'Para você, com amor.',  date:'12/05/2024' },
      { id:'b2', flowers:{'lirio-branco':2,'margarida':2,'lavanda':1}, message:'Gratidão eterna.',      date:'10/05/2024' },
      { id:'b3', flowers:{'girassol':3,'peonia':1,'margarida':1},      message:'Alegria que floresce.', date:'28/04/2024' }
    ];
  }
  if(!state.history.length){
    state.history = [
      { text:'Bem-vindo(a) ao Floriografia', date:'Hoje' },
      { text:'Buquê "Gratidão eterna" foi criado', date:'Ontem' }
    ];
  }
  saveState();

  renderHome();

  await runPreloader();

  const hash = location.hash.replace('#', '') || 'inicio';
  const valid = ['inicio','flores','significados','ocasioes','buque','jardim','quiz'];
  go(valid.includes(hash) ? hash : 'inicio');
}

document.addEventListener('DOMContentLoaded', init);