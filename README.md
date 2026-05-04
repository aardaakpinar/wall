# 🧱 Wall

**Wall**, YAML tabanlı yapılandırma ile tamamen özelleştirilebilen, modüler **Bento Grid portfolio / link sayfası engine’idir**.

Statik olarak çalışır, backend gerektirmez ve özellikle **GitHub Pages** üzerinde hızlı ve kolay yayınlanmak için tasarlanmıştır.

---

## ✨ Özellikler

* 🧩 **Tamamen Card-Based Yapı**
* 🧱 **Bento Grid Layout Engine**
* ⚙️ **YAML ile tam kontrol**
* 🖼️ **Image Card**
* ⚡ **Ultra hızlı (vanilla JS)**
* 📱 **Tam responsive**
* 🎯 **Minimal ve modern UI**

---

## 🖼️ Tasarım Yaklaşımı

Wall, modern web tasarımındaki **Bento Grid sistemini** temel alır.

Sayfa tamamen “kartlardan oluşan bir canvas” gibi çalışır:

Desteklenen kart türleri:

* Hero (profil kartı)
* Socials (opsiyonel genişletme)
* Links
* Projects
* Image Card

Bu yapı sayesinde sayfa:

* Sabit değil
* Tamamen config-driven
* CMS benzeri esnek bir sisteme dönüşür

---

## 🧠 Kart Sistemi

Her şey `cards[]` içinde tanımlanır.

### Desteklenen kart tipleri

| Type       | Açıklama                |
| ---------- | ----------------------- |
| `hero`     | Profil kartı            |
| `links`    | Link listesi            |
| `projects` | Proje kartları          |
| `image`    | İmage kartları          |
| `custom`   | Genişletilebilir yapı   |

---

## 🧾 Image Card Özellikleri 🆕

Image card sistemi:

* Background image destekler
* Opsiyonel link (clickable card)
* Opsiyonel alt text (sol alt köşe overlay)
* Grid span desteği

### Örnek:

```yaml
- type: image
  image: https://picsum.photos/800/400
  url: https://github.com
  alt: My GitHub
  span: 2
```

## ⚙️ Yapılandırma (YAML)

Tüm sayfa artık tek bir `config.yaml` üzerinden yönetilir:

```yaml
theme:
  background: "#0f0f0f"
  foreground: "#fafafa"
  primary: "#23b5b5"
  radius: "16px"

profile:
  name: Arda Akpınar
  title: Developer | Cyber Security
  description: Software developer from Istanbul...
  avatar: https://example.com/avatar.png
  socials:
    - name: github
      url: https://github.com/user

cards:
  - type: hero

  - type: links
    title: Links
    items:
      - name: GitHub
        url: https://github.com/user
        icon: bx-github

  - type: image
    image: https://picsum.photos/800/400
    alt: Workspace
    span: 2

  - type: empty
    span: 1

  - type: projects
    title: Projects
    items:
      - name: Project X
        description: Awesome project
        tags: [JS, Node]
        url: https://example.com
```

---

## 🧩 Renderer Mimarisi

Wall artık **plugin-like renderer system** kullanır:

* Her card type → bir renderer function
* Yeni card eklemek → sadece JS tarafında yeni renderer

Örnek:

* `hero`
* `links`
* `projects`
* `image`

---

## 🚀 Kurulum

```bash
git clone https://github.com/username/wall
cd wall
```

Config düzenle:

```bash
config.yaml
```

---

## 🎯 Proje Felsefesi

Wall’un amacı:

* UI framework değil, **content engine** olmak
* Tasarımı koddan ayırmak
* “YAML = UI” yaklaşımını mümkün kılmak
* Minimal ama genişletilebilir bir sistem sunmak

---

## 🔮 Gelecek Planları

* 🧩 Plugin system (`registerCard`)
* 🧱 Drag & drop grid editor
* 🎨 Live YAML editor (CMS mode)
* 🪟 Masonry / auto-layout engine

---

## 📄 Lisans

MIT License
