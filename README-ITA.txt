windows_manager è un gestore di finestre scritto in Typescript utilizzando REACT.

Questo modulo è stato ideato far avere un'API semplice capace di riprodurre un'ambiente familiare simil-desktop in un applicativo web, con annessa taskbar contenete i pulsanti delle relative finistre.

Ogni finestra può essere ridimensionata manualmente da tre punti: dal lato destro, dal basso e dall'angolo in basso a destra.

Ogni finestra può avere tre pulsanti sul proprio header.
Uno ha la funzione di ridurre la finestra ad icona.

In alternativa si può ridurre una finestra ad icona cliccando sul relativo pulsante della taskbar.

Il pulsante di una finestra sulla taskbar ha diversi comportamenti.
In primo luogo attribuisce il focus alla finestra, altrimenti se questa possiede già il focus la riduce ad icona.

Se invece la finestra è ridotta ad icona, col click sul pulsante la si riporta alle ultime dimensioni note.

Il secondo pulsante sull'header di una finestra, ha la funzione di massimizzarla in fullscreen o riportarla alle dimensioni originali.
Il terzo pulsante può chiudere la finestra, rimuovendo così anche il pulsante dalla taskbar.

Tutti questi comportamenti e i relativi pulsanti possono essere abilitati o disabilitati in fase di creazione delle finestre.

INSTALLAZIONE

1. npm install windows_manager / yarn add windows_manager
2. Importa il componente Finder e l'interfaccia INode e usali nella tua app. 
3. Crea un array di elementi INode (rappresenta le finestre da gestire) e passalo al componente Finder tramite la proprietà "nodes".

UTILIZZO

1. Creare un elemento HeaderBehavior in cui si può definire se la finestra è chiudibile, minimizzabile, trascinabile e se la finestra può andare a schermo intero.

2. Creare un'array di elementi INode (che rappresentano le finestre da gestire) e passare l'elemento HeaderBehavior agli elementi INode (ogni finestra può avere un elemento HeaderBehavior diverso) tramite il campo hProps.

3. Passare l'array di elementi INode al componente Finder tramite la proprietà "nodes".

UTILIZZO AVANZATO

1. Creare un elemento HeaderBehavior in cui puoi definire se la finestra è chiudibile, minimizzabile, trascinabile e se la finestra può andare a schermo intero.

2. Creare una funzione che abbia un elemento Finder come parametro nella quale si definiscono le finestre da aggiungere al componente Finder.

3. Nella funzione creare un elemento INode (con il proprio HeaderBehavior) e aggiungerlo al parametro Finder con il metodo "add(*INode element*)".

4. Creare un componente Finder e passargli la funzione tramite la proprietà "onMounted".

Nota: in un elemento INode si deve definire: un ReactNode come contenuto della finestra, titolo della finestra, se la finestra è ridimensionabile e posizione iniziale.