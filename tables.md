---
layout: default
title: "Tables"
strapline: "Examples of different table layouts"
nav: "yes"
sortTitle: "z"
---
<style>
  h3        {padding-top:2em}
  .country  {font-weight:300}
  .nowrap   {white-space: nowrap}
</style>

<div class="container-fluid">

  <h2>{{page.title}}</h2>
  <p class="strap" style="padding-bottom:1em">{{page.strapline}}</p>

  <div class="row">
    <div class="col-md-3">Sidebar...</div>
    <div class="col-md-9">

      <h3>Simple: single location</h3>
      <!--  5 example retellings from CSV file  -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tale</th>
            <th scope="col">Title of retelling</th>
            <th scope="col">Author</th>
            <th scope="col">Date</th>
            <th scope="col">Country</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {% for retelling in site.data.fairytalesTables %}
          <tr>
            <td>{{ retelling.Tale }}</td>
            <td>{{ retelling.Title }}</td>
            <td>{{ retelling.Author }}</td>
            <td>{{ retelling.Date }}</td>
            <td>{{ retelling.PublicationLocation }}</td>
            <td>{{ retelling.Notes }}</td>      
          </tr>
          {% endfor %}
        </tbody>
      </table>


      <h3>Too many columns: 5 locations</h3>
      <!--  5 example retellings from CSV file  -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tale</th>
            <th scope="col">Title of retelling</th>
            <th scope="col">Author</th>
            <th scope="col">Date</th>
            <th scope="col">Origin</th>
            <th scope="col">Retelling</th>
            <th scope="col">Publication</th>
            <th scope="col">Author Born</th>                
            <th scope="col">Author Lives</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {% for retelling in site.data.fairytalesTables %}
          <tr>
            <td>{{ retelling.Tale }}</td>
            <td>{{ retelling.Title }}</td>
            <td>{{ retelling.Author }}</td>
            <td>{{ retelling.Date }}</td>
            <td>{{ retelling.OriginLocation }}</td>
            <td>{{ retelling.RetellingLocation }}</td>
            <td>{{ retelling.PublicationLocation }}</td>
            <td>{{ retelling.AuthorBornLocation }}</td>
            <td>{{ retelling.AuthorLocation }}</td>
            <td>{{ retelling.Notes }}</td>      
          </tr>
          {% endfor %}
        </tbody>
      </table>


      <h3>Five locations: stack data</h3>
      <!--  5 example retellings from CSV file  -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tale</th>
            <th scope="col">Title of retelling</th>
            <th scope="col">Author</th>
            <th scope="col">Published</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {% for retelling in site.data.fairytalesTables %}
          <tr>
            <td>
              {{ retelling.Tale }}
              <div class="country">{{ retelling.OriginLocation }}</div>
            </td>
            <td>
              {{ retelling.Title }}
              <div class="country">{{ retelling.RetellingLocation }}</div>
            </td>
            <td>
              {{ retelling.Author }}
              <div class="country">
              {% if retelling.AuthorBornLocation == retelling.AuthorLocation %}
              {{ retelling.AuthorBornLocation }}
              {% else %}
              {{ retelling.AuthorBornLocation }} / {{ retelling.AuthorLocation }}
              {% endif %}
              </div>
            </td>
            <td>
              {{ retelling.Date }}
              <div class="country nowrap">{{ retelling.PublicationLocation }}</div>
            </td>
            <td>
              {{ retelling.Notes }}
            </td>
          </tr>
          {% endfor %}
        </tbody>
      </table>


      <h3>Five locations: stack data & icons</h3>
      <!--  5 example retellings from CSV file  -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tale</th>
            <th scope="col">Title of retelling</th>
            <th scope="col">Author</th>
            <th scope="col">Published</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {% for retelling in site.data.fairytalesTables %}
          <tr>
            <td>
              {{ retelling.Tale }}
              <div class="country">{{ retelling.OriginLocation }}</div>
            </td>
            <td>
              {{ retelling.Title }}
              <div class="country">{{ retelling.RetellingLocation }}</div>
            </td>
            <td>
              {{ retelling.Author }}
              <div class="country">
              {% if retelling.AuthorBornLocation == retelling.AuthorLocation %}
              {{ retelling.AuthorBornLocation }}
              {% else %}
              {{ retelling.AuthorBornLocation }} / {{ retelling.AuthorLocation }}
              {% endif %}
              </div>
            </td>
            <td>
              {{ retelling.Date }}
              <div class="country nowrap">{{ retelling.PublicationLocation }}</div>
            </td>
            <td>
              {{ retelling.Notes }}
            </td>
          </tr>
          {% endfor %}
        </tbody>
      </table>

    </div> <!--  /col -->
  </div> <!--  /row -->

</div>
