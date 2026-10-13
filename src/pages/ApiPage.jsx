import React, { useEffect, useState } from 'react';
import './CatalogPage.css';

export const ApiPage = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Делаем запрос к нашему собственному API на Node.js
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не удалось получить данные от сервера');
        }
        return res.json();
      })
      .then((data) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка API:', err);
        setError('Сервер API недоступен. Убедитесь, что бэкенд запущен (npm start в папке server).');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Данные из нашего кастомного API</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Эта страница напрямую обращается к нашему бэкенд-серверу (Node.js + Express).
      </p>

      {loading && <div className="loading">Загрузка данных из API...</div>}
      
      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {!loading && !error && apiData.length === 0 && (
        <div className="loading">В базе данных через API пока нет товаров.</div>
      )}

      <div className="products-grid">
        {apiData.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
              alt={item.title}
              className="product-image"
            />
            <div className="product-info">
              <span className="product-category">{item.category}</span>
              <h3 className="product-title">{item.title}</h3>
              <p className="product-price">{item.price?.toLocaleString('ru-RU')} ₽</p>
              {item.description && <p className="product-desc">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};