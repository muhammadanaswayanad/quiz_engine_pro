# Project Structure & Organization

## Root Directory Layout
```
quiz_engine_pro/
├── __manifest__.py          # Module configuration and dependencies
├── __init__.py             # Python package initialization
├── controllers/            # HTTP request handlers
├── models/                 # Database models and business logic
├── views/                  # XML view definitions and templates
├── static/                 # Frontend assets (CSS, JS, images)
├── security/               # Access rights and security groups
├── migrations/             # Database migration scripts
└── docs/                   # Documentation files
```

## Core Directories

### `/models/` - Data Layer
- **`quiz.py`** - Main quiz model with computed fields
- **`question.py`** - Question types and validation logic
- **`session.py`** - User session tracking
- **`response.py`** - Answer storage and evaluation
- **`question_evaluation.py`** - Scoring algorithms
- **`question_extension.py`** - Additional question type models

**Naming Convention**: Snake_case for files, PascalCase for model classes

### `/controllers/` - Request Handlers
- **`main.py`** - Public quiz routes and session management
- All routes use `auth='public'` and `csrf=False` for public access
- RESTful URL patterns: `/quiz/{slug}/question/{num}`

### `/views/` - UI Definitions
- **`quiz_views.xml`** - Admin interface forms and lists
- **`question_views.xml`** - Question management interface
- **`website_templates.xml`** - Public quiz templates
- **`enhanced_website_templates.xml`** - Advanced question types
- **`admin_views_enhanced.xml`** - Enhanced admin interface

### `/static/` - Frontend Assets
```
static/
├── src/
│   ├── css/               # Stylesheets
│   │   ├── quiz_styles.css           # Main styling
│   │   ├── quiz_drag_drop.css        # Drag & drop specific
│   │   └── quiz_design_system.css    # Design system
│   ├── js/                # JavaScript modules
│   │   ├── quiz_enhanced_interaction.js
│   │   ├── quiz_fill_blanks.js
│   │   └── question_editor.js
│   └── xml/               # Frontend templates
└── description/
    └── icon.png           # Module icon
```

### `/security/` - Access Control
- **`ir.model.access.csv`** - Model-level permissions
- **`security_groups.xml`** - User groups and roles
- **`quiz_security.xml`** - Record-level security rules

## File Naming Conventions

### Python Files
- **Models**: `{model_name}.py` (e.g., `quiz.py`, `question.py`)
- **Controllers**: `{purpose}.py` (e.g., `main.py`)
- Use snake_case for all Python files

### XML Files
- **Views**: `{model}_views.xml` (e.g., `quiz_views.xml`)
- **Templates**: `{purpose}_templates.xml` (e.g., `website_templates.xml`)
- **Security**: `{type}_security.xml` or `.csv`

### CSS/JS Files
- **CSS**: `{component}_{purpose}.css` (e.g., `quiz_drag_drop.css`)
- **JS**: `{component}_{purpose}.js` (e.g., `quiz_enhanced_interaction.js`)

## Model Relationships
```
quiz.quiz (1) ──→ (many) quiz.question
    ├── quiz.choice (MCQ options)
    ├── quiz.match.pair (Matching pairs)
    ├── quiz.drag.token (Drag elements)
    ├── quiz.fill.blank.answer (Fill answers)
    ├── quiz.blank → quiz.option (Dropdown options)
    └── quiz.sequence.item (Sequence steps)

quiz.quiz (1) ──→ (many) quiz.session
quiz.session (1) ──→ (many) quiz.response
```

## Configuration Files

### `__manifest__.py` Structure
- **Dependencies**: `['base', 'web', 'website']`
- **Data files**: Listed in load order
- **Assets**: Separate backend/frontend bundles
- **Version**: Semantic versioning (17.0.x.y.z)

### Asset Loading Order
1. **CSS**: Design system → Component styles → Specific features
2. **JS**: Core libraries → Component handlers → Initialization

## Development Guidelines

### Adding New Question Types
1. Extend `quiz.question` model with new type option
2. Create related models in `models/question_extension.py`
3. Add evaluation logic in `models/question_evaluation.py`
4. Create frontend template in `views/website_templates.xml`
5. Add CSS/JS handlers in `static/src/`

### Database Migrations
- Place in `migrations/{version}/` directory
- Use `pre-migration.py` for data transformations
- Update `__manifest__.py` version number

### Documentation Location
- **User docs**: `docs/` directory
- **Technical docs**: `README.md`, `WORKLOG.md`
- **Code docs**: Inline docstrings and comments