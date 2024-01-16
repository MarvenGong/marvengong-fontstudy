import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import  './index.less';
import Design from './Design';

export default function IndexPage() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Design />
    </DndProvider>
  );
}

