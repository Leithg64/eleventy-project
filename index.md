<head>
  <link rel="stylesheet" href="styles.css">
</head>

<!-- # Liquid experiments

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

#### copy this https://www.gov.uk/bank-holidays style (will need code to split into years)

#### show off and use some nice css framework for a .... -->

---
layout: base.njk
title: Bank Holidays
eleventyComputed:
  bankHolidays: bankHolidays
---

# Bank Holidays

<h2>Raw JSON Data:</h2>
<pre>{{ bankHolidays | jsonify }}</pre>  

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Date</th>
      <th>Notes</th>
      <th>Bunting</th>
    </tr>
  </thead>
  <tbody>
    {% if bankHolidays["england-and-wales"].events %}
      {% for event in bankHolidays["england-and-wales"].events %}
      <tr>
        <td>{{ event.title }}</td>
        <td>{{ event.date }}</td>
        <td>{{ event.notes | default: "None" }}</td>
        <td>{{ event.bunting | default: "No" }}</td>
      </tr>
      {% endfor %}
    {% else %}
      <tr><td colspan="4">No bank holidays available.</td></tr>
    {% endif %}
  </tbody>
</table>



