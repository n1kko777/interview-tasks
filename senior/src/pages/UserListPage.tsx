import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSearchbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonModal,
  IonAvatar, IonChip, IonSpinner, IonText,
} from '@ionic/react';
import { heart, heartOutline, close } from 'ionicons/icons';

// Mock API
const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Алексей Иванов', email: 'alexey@example.com', role: 'Frontend Developer', department: 'Engineering', phone: '+7 999 111-22-33', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'UI/UX Designer', department: 'Design', phone: '+7 999 222-33-44', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'Backend Developer', department: 'Engineering', phone: '+7 999 333-44-55', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Елена Козлова', email: 'elena@example.com', role: 'Product Manager', department: 'Product', phone: '+7 999 444-55-66', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Сергей Новиков', email: 'sergey@example.com', role: 'DevOps Engineer', department: 'Infrastructure', phone: '+7 999 555-66-77', avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Анна Морозова', email: 'anna@example.com', role: 'QA Engineer', department: 'Quality', phone: '+7 999 666-77-88', avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'Павел Волков', email: 'pavel@example.com', role: 'Team Lead', department: 'Engineering', phone: '+7 999 777-88-99', avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Ольга Соколова', email: 'olga@example.com', role: 'Data Analyst', department: 'Analytics', phone: '+7 999 888-99-00', avatar: 'https://i.pravatar.cc/150?u=8' },
      ]);
    }, 800);
  });
};

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [searchText, setSearchText] = useState<any>('');
  const [favorites, setFavorites] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);

  // Проблема: useEffect не сработает при возврате на страницу в Ionic
  useEffect(() => {
    fetchUsers().then((data: any) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const toggleFavorite = (userId: any) => {
    if (favorites.includes(userId)) {
      setFavorites(favorites.filter((id: any) => id !== userId));
    } else {
      setFavorites([...favorites, userId]);
    }
  };

  const openUserDetail = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Проблема: фильтрация на каждый рендер, нет debounce
  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase()) ||
    user.department.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Команда</IonTitle>
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
          <IonTitle>Команда</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Проблема: поиск без debounce */}
        <div style={{ padding: '8px' }}>
          <IonSearchbar
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.detail.value || '')}
            placeholder="Поиск по имени, роли или отделу"
            style={{ marginBottom: '8px' }}
          />
        </div>

        {/* Проблема: inline стили, нет отдельного компонента для карточки */}
        <div style={{ padding: '0 8px' }}>
          {filteredUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <IonText color="medium">
                <p>Ничего не найдено</p>
              </IonText>
            </div>
          ) : (
            filteredUsers.map((user: any) => (
              <IonCard key={user.id} style={{ margin: '8px 0' }}>
                <IonCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={() => openUserDetail(user)}>
                      <IonAvatar style={{ width: '48px', height: '48px' }}>
                        <img src={user.avatar} alt={user.name} />
                      </IonAvatar>
                      <div>
                        <IonCardTitle style={{ fontSize: '16px' }}>{user.name}</IonCardTitle>
                        <IonChip style={{ margin: '4px 0 0 0', height: '24px' }} color="primary">
                          <IonLabel style={{ fontSize: '12px' }}>{user.role}</IonLabel>
                        </IonChip>
                      </div>
                    </div>
                    <IonButton
                      fill="clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(user.id);
                      }}
                    >
                      <IonIcon
                        icon={favorites.includes(user.id) ? heart : heartOutline}
                        color={favorites.includes(user.id) ? 'danger' : 'medium'}
                        style={{ fontSize: '24px' }}
                      />
                    </IonButton>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IonText color="medium" style={{ fontSize: '14px' }}>
                      {user.department}
                    </IonText>
                    <IonText color="medium" style={{ fontSize: '14px' }}>
                      {user.email}
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>

        {/* Проблема: модалка прямо в компоненте, нет выделения */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {selectedUser && (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>{selectedUser.name}</IonTitle>
                  <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                  <IonAvatar style={{ width: '120px', height: '120px', marginBottom: '16px' }}>
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                  </IonAvatar>
                  <h2 style={{ margin: '0 0 8px 0' }}>{selectedUser.name}</h2>
                  <IonChip color="primary">
                    <IonLabel>{selectedUser.role}</IonLabel>
                  </IonChip>
                </div>
                <IonList>
                  <IonItem>
                    <IonLabel>
                      <h3>Отдел</h3>
                      <p>{selectedUser.department}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <h3>Email</h3>
                      <p>{selectedUser.email}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <h3>Телефон</h3>
                      <p>{selectedUser.phone}</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
                <div style={{ padding: '16px' }}>
                  <IonButton
                    expand="block"
                    color={favorites.includes(selectedUser.id) ? 'danger' : 'primary'}
                    onClick={() => toggleFavorite(selectedUser.id)}
                  >
                    <IonIcon slot="start" icon={favorites.includes(selectedUser.id) ? heart : heartOutline} />
                    {favorites.includes(selectedUser.id) ? 'Убрать из избранного' : 'В избранное'}
                  </IonButton>
                </div>
              </IonContent>
            </IonPage>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
