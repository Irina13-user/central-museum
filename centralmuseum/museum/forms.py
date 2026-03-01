from django import forms

class MainForm(forms.Form):
    design = forms.ChoiceField(
        label='Какой дизайн нравится больше?',
        choices=[
            ('old-design', 'Старый'),
            ('new-design', 'Новый')
        ],
        widget=forms.RadioSelect,
        initial='new-design'
    )
    new_options = forms.MultipleChoiceField(
        label='Что нравится в новой версии?',
        required=False,
        choices=[
            ('design', 'Дизайн'),
            ('order', 'Расположение элементов'),
            ('color', 'Цветовая схема'),
            ('animation', 'Анимация'),
            ('3d_model', '3D Модель (AR)')
        ],
        widget=forms.CheckboxSelectMultiple
    )