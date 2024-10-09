---
title: Liquid Testing Site
layout: layout.njk
---

<h1>Liquid Testing Site</h1>


<div>
  <h1>TO DO:</h1>
  <s><h4>-Make a bootstrap accordian with the regions</h4></s>
  <s><h4>-11ty/liquid includes and base templates</h4></s>
  <h4>-Default to the region I am in, using CF worker (request.cf.country)</h4>
  <h4>-Move the worker code to the pages site (funtions dir) and use git push to deploy</h4>
  <h4>-Create production site using test code</h4>
</div>

<!-- ### the string literal "now" is passed to the [date](https://shopify.github.io/liquid/filters/date/) filter and will be evalualated as current date and time, and formated with the formating template string

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

<h1>Raw JSON data:</h1>

### This code interpolates the bankHolidays variable as a JSON string. The jsonify filter then formats the code into JSON.

<div class="rawJSON">

```json

{{ bankHolidays | json:4 }} 
```

</div>

<h1>UK Bank Holidays (Table):</h1>

<table class="table table-striped">
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
<br>


<h1>UK Bank Holidays (Accordian): </h1>

### Data is fetched from the Gov.uk API using a cloudflare worker that iterates through the data and filters out past events. They are then arranged by year and placed in the corresponding country's container within a Bootstrap accordian element.

<div class="accordion" id="eventsAccordion">
    <!-- ENGLAND AND WALES -->
    <div class="accordion-item" id="englandAndWales">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                England and Wales
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#eventsAccordion">
            <div class="accordion-body" id="englandAndWalesBody"></div>
        </div>
    </div>
    <!-- SCOTLAND -->
    <div class="accordion-item" id="scotland">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Scotland
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#eventsAccordion">
            <div class="accordion-body" id="scotlandBody"></div>
        </div>
    </div>
    <!-- NORTHERN IRELAND -->
    <div class="accordion-item" id="northernIreland">
        <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Northern Ireland
            </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#eventsAccordion">
            <div class="accordion-body" id="northernIrelandBody"></div>
        </div>
    </div>
</div>

<script>
async function fetchEvents() {
    try {
        //retrieves the data from the given URL and waits for it to be fully fetched
        const response = await fetch('https://purple-pine-028c.leith-green.workers.dev/');
        //converts the data to JSON once fetched
        const data = await response.json();

        //varaible holds the events array and container for the data to be combined
        const populateEvents = (events, container) => {
            let lastYear = null;

            //creates a date for each event and extract the year
            events.forEach(event => {
                const eventDate = new Date(event.date);
                const year = eventDate.getFullYear();
                
                //checks the year, adds heading element to separate each years events if different
                if (year !== lastYear) {
                    const yearHeader = document.createElement('h5');
                    yearHeader.innerText = year;
                    container.appendChild(yearHeader);
                    lastYear = year; // Update last year
                }

                //creates a div to store the fetched event data, set it to display in the container
                const div = document.createElement('div');
                div.innerText = `${event.title} - ${eventDate.toLocaleDateString()}`;
                //then adds the element to the DOM so it's visible in the browser
                container.appendChild(div);
            });
        };

        //gets correct element for each region and populate with corresponding event data
        const englandAndWalesBody = document.getElementById('englandAndWalesBody');
        populateEvents(data['england-and-wales'].events, englandAndWalesBody);

        const scotlandBody = document.getElementById('scotlandBody');
        populateEvents(data.scotland.events, scotlandBody);

        const northernIrelandBody = document.getElementById('northernIrelandBody');
        populateEvents(data['northern-ireland'].events, northernIrelandBody);

    //throws an error if the try code is unsuccessful
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

//calls the function to execute the code and display it in the browser accordion 
fetchEvents();


</script>

<script>
  hljs.highlightAll();
</script>

