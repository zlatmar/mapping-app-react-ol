# React + OpenLayers Example  

This project demonstrates how to use the **[Frontend Web GIS Architecture Template](https://github.com/zlatmar/base-mapping-app-frame)** with **React** as the UI framework and the **OpenLayers** as the mapping library.

It follows the layered architecture (Domain → Core → Adapter → View) to ensure a clean separation of concerns and maintainable codebase.  

---

## 🏗️ Architecture Overview  

This project is structured according to the template:  

- **Domain** → Defines mapping interfaces (`IMapManagerCore`, etc.)  
- **Core** → Implements mapping functionality using **OpenLayers**  
- **Adapter** → Bridges React components with the Core mapping implementation  
- **View** → UI layer built with **React** (components consume Adapter, not Core directly)  

---

## 📂 Project Structure  

│── Domain/ # Base interfaces and contracts \
│── Core/ # OpenLayers-based map implementation \
│── Adapter/ # Bridges React UI and Core \
│── View/ # React components (UI)


---

## ⚡ Getting Started  

### 1. Clone the repository  

```bash
git https://github.com/zlatmar/mapping-app-react-ol.git
cd mapping-app-react-ol
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server
```
npm run dev
```

---

## 📖 Related Projects

This example is based on the Frontend Architecture Template. \
Check out other implementations:

 - [React + ArcGIS Mapping SDK for JavaScript Example](https://github.com/zlatmar/mapping-app-react-arcgis)

