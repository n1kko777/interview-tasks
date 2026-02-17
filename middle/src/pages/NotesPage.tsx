import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonIcon,
  IonInput, IonSpinner, IonText, IonFab, IonFabButton,
} from '@ionic/react';
import { add, trash, document } from 'ionicons/icons';

// Mock API
const fetchNotes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Покупки', text: 'Купить молоко, хлеб, яйца, масло, сыр, помидоры и огурцы в магазине после работы', createdAt: '2024-01-15' },
        { id: 2, title: 'Идеи для проекта', text: 'Добавить тёмную тему, реализовать push-уведомления, настроить CI/CD пайплайн для автоматического деплоя', createdAt: '2024-01-16' },
        { id: 3, title: 'Встреча', text: 'Обсудить архитектуру нового модуля с командой бэкенда в четверг в 15:00', createdAt: '2024-01-17' },
        { id: 4, title: 'Книги', text: 'Прочитать Clean Code, Refactoring by Martin Fowler, Design Patterns', createdAt: '2024-01-18' },
      ]);
    }, 600);
  });
};

// TODO: Реализовать HOC withShortenParagraph
// HOC должен:
// 1. Принимать компонент, который рендерит children (текст)
// 2. Добавлять prop textLength (по умолчанию 10)
// 3. Если textLength === -1, текст отображается полностью
// 4. Иначе текст обрезается до textLength символов и добавляется "..."
const withShortenParagraph = (Component: any) => {
  return Component; // заглушка — нужно реализовать
};

const NoteText = ({ children }: any) => (
  <IonText>
    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{children}</p>
  </IonText>
);

const ShortenedNoteText = withShortenParagraph(NoteText);

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [newTitle, setNewTitle] = useState<any>('');
  const [newText, setNewText] = useState<any>('');
  const [showFullText, setShowFullText] = useState<any>({});

  useEffect(() => {
    fetchNotes().then((data: any) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const addNote = () => {
    if (!newTitle.trim() || !newText.trim()) return;
    const note: any = {
      id: Date.now(),
      title: newTitle,
      text: newText,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setNotes([...notes, note]);
    setNewTitle('');
    setNewText('');
  };

  const deleteNote = (id: any) => {
    setNotes(notes.filter((note: any) => note.id !== id));
  };

  const toggleFullText = (id: any) => {
    setShowFullText({ ...showFullText, [id]: !showFullText[id] });
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Заметки</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Заметки</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px' }}>
          <IonCard>
            <IonCardContent>
              <IonInput
                value={newTitle}
                onIonInput={(e: any) => setNewTitle(e.detail.value || '')}
                placeholder="Заголовок"
                style={{ marginBottom: '8px' }}
              />
              <IonInput
                value={newText}
                onIonInput={(e: any) => setNewText(e.detail.value || '')}
                placeholder="Текст заметки"
                style={{ marginBottom: '8px' }}
              />
              <IonButton expand="block" onClick={addNote} disabled={!newTitle.trim() || !newText.trim()}>
                <IonIcon slot="start" icon={add} />
                Добавить заметку
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <div style={{ padding: '0 16px' }}>
          {notes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <IonIcon icon={document} style={{ fontSize: '48px', color: '#ccc' }} />
              <IonText color="medium">
                <p>Нет заметок</p>
              </IonText>
            </div>
          ) : (
            notes.map((note: any) => (
              <IonCard key={note.id} style={{ margin: '8px 0' }}>
                <IonCardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IonCardTitle style={{ fontSize: '16px' }}>{note.title}</IonCardTitle>
                    <IonButton fill="clear" color="danger" onClick={() => deleteNote(note.id)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div onClick={() => toggleFullText(note.id)} style={{ cursor: 'pointer' }}>
                    <ShortenedNoteText textLength={showFullText[note.id] ? -1 : 40}>
                      {note.text}
                    </ShortenedNoteText>
                  </div>
                  <IonText color="medium" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
                    {note.createdAt}
                  </IonText>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotesPage;
