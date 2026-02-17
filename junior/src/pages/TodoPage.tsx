import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonInput, IonCheckbox, IonBadge, IonText,
} from '@ionic/react';
import { add } from 'ionicons/icons';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', done: false },
    { id: 2, text: 'Написать компонент', done: true },
    { id: 3, text: 'Пройти собеседование', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  // Баг 3: неправильные зависимости useEffect
  useEffect(() => {
    setTotalCount(todos.length);
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    // Баг 1: мутация state напрямую (push вместо создания нового массива)
    todos.push({
      id: Date.now(),
      text: newTodo,
      done: false,
    });
    setTodos(todos);
    setNewTodo('');
  };

  // Баг 4: некорректный toggle — перезаписывает объект вместо создания нового
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
    setTodos([...todos]);
  };

  // TODO: Добавить функцию удаления задачи

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Задачи</IonTitle>
          <IonBadge slot="end" color="primary" style={{ marginRight: '16px' }}>
            {totalCount}
          </IonBadge>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
          <IonInput
            value={newTodo}
            onIonInput={(e) => setNewTodo(e.detail.value || '')}
            placeholder="Новая задача..."
            style={{ flex: 1 }}
          />
          <IonButton onClick={addTodo} disabled={!newTodo.trim()}>
            <IonIcon icon={add} />
          </IonButton>
        </div>

        <IonList>
          {/* Баг 2: отсутствует key */}
          {todos.map((todo) => (
            <IonItem>
              <IonCheckbox
                slot="start"
                checked={todo.done}
                onIonChange={() => toggleTodo(todo.id)}
              />
              <IonLabel
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#999' : 'inherit',
                }}
              >
                {todo.text}
              </IonLabel>
              {/* TODO: Добавить кнопку удаления */}
            </IonItem>
          ))}
        </IonList>

        {todos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <IonText color="medium">
              <p>Нет задач. Добавьте первую!</p>
            </IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TodoPage;
