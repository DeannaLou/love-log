import React, { useState, useEffect } from 'react';
import { APILoader, Map, Marker, NavigationControl, GeolocationControl, InfoWindow } from '@uiw/react-baidu-map';

function App() {
  const [activeSection, setActiveSection] = useState('health');
  const [currentPosition, setCurrentPosition] = useState(null);

  const handleMapClick = ({ point }) => {
    setCurrentPosition(point);
  };

  useEffect(() => {
    if (activeSection === 'outdoor') {
      // 模拟点击地理定位控件以获取当前位置
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          console.log('自动定位成功', { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('自动定位失败', error);
          alert('无法获取当前位置，请检查浏览器权限设置。');
        }
      );
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">爱狗 H5 网站</h1>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-4">
              <li><button onClick={() => setActiveSection('health')} className="text-blue-500 hover:underline">健康</button></li>
              <li><button onClick={() => setActiveSection('training')} className="text-blue-500 hover:underline">训练</button></li>
              <li><button onClick={() => setActiveSection('outdoor')} className="text-blue-500 hover:underline">出门</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeSection === 'health' && (
          <section id="health" className="mb-8">
            <h2 className="text-2xl font-semibold">健康</h2>
            <ul className="list-disc pl-5">
              <li>能不能吃</li>
              <li>能不能干</li>
            </ul>
          </section>
        )}

        {activeSection === 'training' && (
          <section id="training" className="mb-8">
            <h2 className="text-2xl font-semibold">训练</h2>
            <ul className="list-disc pl-5">
              <li>专注力</li>
              <li>召回</li>
              <li>坐</li>
              <li>握手</li>
              <li>转圈</li>
            </ul>
          </section>
        )}

        {activeSection === 'outdoor' && (
          <section id="outdoor" className="mb-8">
            <h2 className="text-2xl font-semibold">出门</h2>
            <APILoader akay="A1myVhiqmHXIinXEg9n5ApfkllniL6WA">
              <Map
                center={currentPosition || { lng: 116.404, lat: 39.915 }}
                zoom={15}
                style={{ height: '400px' }}
                onClick={handleMapClick}
              >
                <NavigationControl />
                <GeolocationControl
                  onLocationSuccess={({ point }) => {
                    setCurrentPosition(point);
                    console.log('定位成功', point);
                  }}
                  onLocationError={(error) => {
                    console.error('定位失败', error);
                    alert('无法获取当前位置，请检查浏览器权限设置。');
                  }}
                />
                {currentPosition && (
                  <Marker position={currentPosition}>
                    <InfoWindow position={currentPosition} text={`经度: ${currentPosition.lng}, 纬度: ${currentPosition.lat}`} title="当前位置" />
                  </Marker>
                )}
              </Map>
            </APILoader>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
