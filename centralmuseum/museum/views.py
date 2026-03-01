from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import MainForm
from .models import Vote

class MainView(TemplateView):
    template_name = 'museum/index.html'
    form = MainForm

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {"form": self.form})

    def post(self, request, *args, **kwargs):
        form = MainForm(request.POST)
        if form.is_valid():
            design = form.cleaned_data['design'] == "new-design"
            new_options = form.cleaned_data['new_options']
            design_option = True if "design" in new_options else False
            order_option = True if "order" in new_options else False
            color_option = True if "color" in new_options else False
            animation_option = True if "animation" in new_options else False
            model_option = True if "3d_model" in new_options else False
            options = {
                "design": design_option,
                "order": order_option,
                "color": color_option,
                "animation": animation_option,
                "model": model_option,
            }
            vote = Vote.objects.create(design=design, advantages=options)
            return render(request, self.template_name, {"message": "Спасибо за участие!"})


class ResultsView(TemplateView):
    template_name = 'museum/results.html'

    def get(self, request, *args, **kwargs):
        votes = Vote.objects.all()
        count = votes.count()
        old_design = Vote.objects.filter(design=False).count()
        new_design = count - old_design
        design = Vote.objects.filter(advantages__design=True).count()
        order = Vote.objects.filter(advantages__order=True).count()
        color = Vote.objects.filter(advantages__color=True).count()
        animation = Vote.objects.filter(advantages__animation=True).count()
        model = Vote.objects.filter(advantages__model=True).count()
        context = {}
        context["count"] = count
        context["old_design"] = old_design
        context["new_design"] = new_design
        context["design_options"] = design
        context["design_options_percentage"] = design / count * 100
        context["order_options"] = order
        context["order_options_percentage"] = order / count * 100
        context["color_options"] = color
        context["color_options_percentage"] = color / count * 100
        context["animation_options"] = animation
        context["animation_options_percentage"] = animation / count * 100
        context["model_options"] = model
        context["model_options_percentage"] = model / count * 100
        return render(request, self.template_name, context)
