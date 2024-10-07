---
title: Liquid Testing Site
layout: layout.njk
---


<!-- # Liquid Testing Site

### the string literal "now" is passed to the [date](https://shopify.github.io/liquid/filters/date/) filter and will be evalualated as current date and time, and formated with the formating template string

{{ "now" | date: "%Y-%m-%d" }}

### we pass a string literal to the [split](https://shopify.github.io/liquid/filters/split/) filter with ', ' as the delimiter an the result is assigned to the variable

beatles with [assign](https://shopify.github.io/liquid/tags/variable/#assign)

{% assign beatles = "John, Paul, George, Ringo" | split: ", " %}

{% for b in beatles %}

    {{- b | append: " " -}}

{% endfor %}

## a example from the eleventy documentation including remote data

{{ testData.full_name }}

<pre>

{{ testData | json}}
</pre>

### using the site.json static date include from \_data

- {{site.title}}

- {{ site.status }}

### rendering holiday object as json with the json filter inside a `<pre>` tag

<pre>

{{ site.holidays | json}}

</pre>

### use a for loop to [iterate](https://shopify.github.io/liquid/tags/iteration/) over the holidays in the site.json static data

---

{% for h in site.holidays %}

{{ h.title }}
{{ h.Date }}

{% endfor %}

### The for loop iterates over holidays in site and rendering the title snd date into specified table data tags. An alternate option would be the [tablerow](https://shopify.github.io/liquid/tags/iteration/#tablerow) iteration loop

---

<table>
  <tr>
    <th>Title:</th>
    <th>Date:</th>
  </tr>
  {% for h in site.holidays %}
  <tr>
    <td>{{h.title}}</td>
    <td>{{h.date}}</td>
  </tr>
{% endfor %}
</table>

### now... use the data from https://www.api.gov.uk/gds/bank-holidays/#bank-holidays https://www.gov.uk/bank-holidays.json using the same approach as the testData.mjs example

#### start simple, render the whole lot .json

#### get fancy, make a table

#### copy this https://www.gov.uk/bank-holidays style.

#### show off and use some nice css framework -->


 <!-- <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Title</th>
      <th>Notes</th>
      <th>Bunting</th>
    </tr>
  </thead>
  <tbody>
    {% tablerow event in bankHolidays["england-and-wales"].events %}
      {{ event.date }}
    {% endtablerow %}
    {% tablerow event in bankHolidays["england-and-wales"].events %}
      {{ event.title }}
    {% endtablerow %}
    {% tablerow event in bankHolidays["england-and-wales"].events %}
      {{ event.notes | default: "None" }}
    {% endtablerow %}
    {% tablerow event in bankHolidays["england-and-wales"].events %}
      {{ event.bunting | default: "false" }}
    {% endtablerow %}
   </tbody>  
</table>  -->

### This code interpolates the bankHolidays variable as a JSON string. The jsonify filter then formats the code into JSON.

<pre>{{ bankHolidays | jsonify }}</pre>  

# Bank Holidays

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Title</th>
      <th>Notes</th>
      <th>Bunting</th>
    </tr>
  </thead>

### A conditional checks the bankHolidays object for relavent data, then that data is iterated over and table rows are created to display the data. <br> Meanwhile, the lastYear variable is set as an empty string, and is then checked aganst the current year of the holiday and if different, a new row is created with data that displays the year. The variable is then set to the current year before starting the next iteration.

  <tbody>
    {% if bankHolidays["england-and-wales"].events %}
      {% assign lastYear = "" %}
      {% for event in bankHolidays["england-and-wales"].events %}
        {% assign currentYear = event.date | date: "%Y" %}
        {% if currentYear != lastYear %}
          <tr>
            <td>{{ currentYear }}</td>
          </tr>
          {% assign lastYear = currentYear %}
        {% endif %}
        <tr>
          <td>{{ event.date }}</td>
          <td>{{ event.title }}</td>
          <td>{{ event.notes | default: "None" }}</td>
          <td>{{ event.bunting | default: "false" }}</td>
        </tr>
      {% endfor %}
    {% else %}
      <tr><td>No bank holidays available.</td></tr>
    {% endif %}
  </tbody>
</table>



